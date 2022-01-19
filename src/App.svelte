<script type="text/javascript">
	import { onMount } from "svelte";
	import CandidateList from "./CandidateList.svelte";
	import VirtualList from '@sveltejs/svelte-virtual-list';


	//let races = [];

	/*onMount(async function() {
		const response = await fetch(` https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		const json = await response.json();
		races = json;
		
	});*/
	//console.log(races);

	let items = []
	async function getData() {
		let res = await fetch(`https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		let data = await res.json();
		items = data
		return items;
	}

	const dataPromise = getData();

	let searchTerm = '';
	$: filteredList = dataPromise.then((r) => {
		var lowSearch = searchTerm.toLowerCase();
		return items.filter(item =>
			Object.values(item).some(val => 
				String(val).toLowerCase().includes(lowSearch) 
			)
		);
	});

	let start, start2
    let end, end2
    
  </script>

Filter: <input bind:value={searchTerm} />
{searchTerm}

<div class='container'>
	{#await filteredList}
		Loading...
	{:then items}
		{#each items as race}
			<h2>{race.office}</h2>
			<p>{race.blurb}</p>
			<CandidateList candidates = {race.candidates}/>
		{/each}
	{/await}
</div>
