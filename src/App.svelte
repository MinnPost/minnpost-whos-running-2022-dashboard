<script type="text/javascript">
	import { onMount } from "svelte";
	import CandidateList from "./CandidateList.svelte";
	import VirtualList from '@sveltejs/svelte-virtual-list';

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
		let races = items.races.filter(
			item => Object.values(item).some(
				val => String(val).toLowerCase().includes(lowSearch) 
			)
		);
		let candidates = items.candidates.filter(
			item => Object.values(item).some(
				val => String(val).toLowerCase().includes(lowSearch) 
			)
		);
		let data = [];
		if ( races ) {
			data["races"] = races;
		}
		if ( candidates ) {
			data["candidates"] = candidates;
		}
		return data;
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
		{#each items.races as race}
			<h2>{race.office}</h2>
			<p>{race.blurb}</p>
			<CandidateList candidates = {items.candidates.filter(
				(item) => item["office-sought"].toUpperCase().indexOf(race.office.toUpperCase()) !== -1
			)}/>
		{/each}
	{/await}
</div>
