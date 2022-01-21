<script type="text/javascript">
	import AllCandidates from "./AllCandidates.svelte";
    import ByOffice from './ByOffice.svelte';
	import ByParty from './ByParty.svelte';

    export let params;

	let items = []
	async function getData() {
		let res = await fetch(`https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		let data = await res.json();
		items = data
		return items;
	}
    const dataPromise = getData();

	// this method allows us to specify keys that should not be searched
	function filterResults(searchTerm, data) {
		var lowSearch = searchTerm.toLowerCase();
		let skipKeys = ['blurb'];
		let searchInDesiredKeys = data.filter(
			item => Object.entries(item).some(
				([key, val]) => ! skipKeys.includes(key) ? String(val).toLowerCase().includes(lowSearch) : false
			)
		);
		return searchInDesiredKeys;
	}

	let searchTerm = '';
	$: filteredList = dataPromise.then((r) => {

		// filter the races and/or candidates by the search term
		let races = filterResults(searchTerm, items.races);
		let candidates = filterResults(searchTerm, items.candidates);
		let all_offices = [...new Set(items.candidates.map(item => item["office-sought"]))];

		// if there are no races but there are candidates, get the key from the candidate
		// then get the corresponding race and push it
		// after the loop, we still need to assign races to races
		if (races.length === 0 && candidates.length !== 0) {
			candidates.forEach(async function(candidate) {
				let candidate_race = items.races[candidate["race-key"]]
				races.push(candidate_race);
			});
			races = races;
		}

		// make the final data array of races and candidates for filteredList to use and return it
		let data = [];
		if ( typeof all_offices !== "undefined" ) {
			data["all_offices"] = all_offices;
		}
		if ( typeof races !== "undefined" ) {
			data["races"] = races;
		}
		if ( typeof candidates !== "undefined" ) {
			data["candidates"] = candidates;
		}
		return data;
	});

	let start, start2
    let end, end2
    
  </script>


<a href="/by-office/senate">senate</a>

<input bind:value={searchTerm} />
{searchTerm}

<div class='container'>
	{#await filteredList}
		Loading...
	{:then items}

		{#each items.all_offices as office}
			<a href="/by-office/senate">{office}</a>
		{/each}


        {#if !params }
            <AllCandidates items={items} />
        {:else if params.party }
            <ByParty items={items} params={params} />
        {:else if params.office }
            <ByOffice items={items} params={params} />
        {/if}
	{/await}
</div>
