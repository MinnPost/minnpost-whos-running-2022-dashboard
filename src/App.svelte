<script type="text/javascript">
	import CandidateList from "./CandidateList.svelte";

	let items = []
	async function getData() {
		let res = await fetch(`https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		let data = await res.json();
		items = data
		return items;
	}

	/*$: filteredList = items.filter(
        (item) => item.office.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1
    )*/

	// this method allows us to specify keys that should not be searched
	function filterResults(searchTerm, data) {
		var lowSearch = searchTerm.toLowerCase();
		let skipKeys = ['blurb'];
		/*let searchInAllKeys = data.filter(
			item => Object.values(item).some(
				val => String(val).toLowerCase().includes(lowSearch) 
			)
		);*/
		let searchInDesiredKeys = data.filter(
			item => Object.entries(item).some(
				([key, val]) => ! skipKeys.includes(key) ? String(val).toLowerCase().includes(lowSearch) : false
			)
		);
		return searchInDesiredKeys;
	}

	const dataPromise = getData();

	let searchTerm = '';
	$: filteredList = dataPromise.then((r) => {

		// filter the races and/or candidates by the search term
		let races = filterResults(searchTerm, items.races);
		let candidates = filterResults(searchTerm, items.candidates);

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

<input bind:value={searchTerm} />
{searchTerm}

<div class='container'>
	{#await filteredList}
		Loading...
	{:then items}
		{#each items.races as race}
			<section>
				<h2>{race.office}</h2>
				<p>{race.blurb}</p>
				<CandidateList candidates = {items.candidates.filter(
					(item) => item["office-sought"].toUpperCase().indexOf(race.office.toUpperCase()) !== -1
				)}/>
			</section>
		{/each}
	{/await}
</div>
