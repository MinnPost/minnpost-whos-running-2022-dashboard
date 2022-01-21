<script>
	// router
	import router from "page";
	
	// result sets
	import AllCandidates from "./AllCandidates.svelte";
    import ByOffice from './ByOffice.svelte';
	import ByParty from './ByParty.svelte';

	// current result set
	let results;

	// url parameters
	let params;

	// remote data
	let items = []
	async function getData() {
		let res = await fetch(`https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		let data = await res.json();
		items = data
		return items;
	}
    const dataPromise = getData();

	// this method allows us to specify keys that should not be searched and then filter the results
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

	// filter by text
	let searchTerm = '';
	$: filteredList = dataPromise.then((r) => {

		// filter the races and/or candidates by the search term
		let races = filterResults(searchTerm, items.races);
		let candidates = filterResults(searchTerm, items.candidates);
		let all_offices = [...new Set(items.candidates.map(item => item["office-sought"]))];
		let all_parties = [...new Set(items.candidates.map(item => item.party))];

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

		// make the final data array of races and candidates, and parties and offices, for filteredList to use and return it
		let data = [];
		if ( typeof all_offices !== "undefined" ) {
			data["all_offices"] = all_offices;
		}
		if ( typeof all_parties !== "undefined" ) {
			data["all_parties"] = all_parties;
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

	// template router
	router('/', () => results = AllCandidates)
	router('/by-office', () => results = ByOffice)
	router('/by-office/:office', (context, next) => {
  		params = context.params
  		next()}, () => results = ByOffice)
	router.start();
	router('/by-party', () => results = ByParty)
	router('/by-party/:party', (context, next) => {
  		params = context.params
  		next()}, () => results = ByParty)
	router.start();

</script>

<input bind:value={searchTerm} />
{searchTerm}



<div class='container'>
	{#await filteredList}
		Loading...
	{:then items}
		{#each items.all_parties as party}
			{party}
		{/each}
		<svelte:component this={results} params="{params}" items="{items}" />
	{/await}
</div>


