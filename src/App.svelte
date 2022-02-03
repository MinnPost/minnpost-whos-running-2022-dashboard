<style>
	:global(.race-listing) {
		border-bottom: 1px solid #d6d6da;
		margin-bottom: 1.5em;
		padding-bottom: .75em;
	}
	:global(.race-listing:last-of-type) {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	:global(.candidates-list) {
    	display: flex;
    	flex-wrap: wrap;
		margin-bottom: 1.5em;
		justify-content: space-between;
  	}
	:global(.candidates-list h3, .candidates-list h4) {
		width: 100%;
		/*margin-bottom: 0.25em;*/
	}

	:global(.m-homepage-zones .m-zone) {
		max-width: none;
		width: 100%;
	}

	:global(.party-name) {
		color: #869298;
	}
	:global(.party-dfl) {color: #0793AB;}
	:global(.party-republican) {color: #A1000F}
	:global(.party-legal-marijuana-now) {color: #286806;}
	:global(.party-grassroots-legalize-cannabis) {color: #41AB07;}

	.m-filtering {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 0.75em;
	}
	.a-filter-search {
		width: 100%;
	}
	.a-filter-select {
		width: 47.4576271186%;
	}

	@media screen and (max-width: 960px) {
		.a-filter-select {
			width: 100%;
			margin-bottom: 0.25em;
		}
  }

	.a-filter-switch {
		display: flex;
		justify-content: flex-end;
		font-size: var(--scale-3);
	}
	.a-switch-toggle {
		cursor: pointer;
	}
</style>

<script>
	// router
	import router from "page";
	import routes from "./routes";

	// the nice Svelte select element
	import Select from 'svelte-select';

	// the Svelte toggle switch
	import Switch from './components/Switch.svelte';

	// current result set
	let results;

	// url parameters
	let params;

	// remote data
	let items = []
	async function getData() {
		/*
		for actual 2022 data:
		https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker.json
		for sample (changed based on 2020) data:
		https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-2020-sample-data.json
		*/
		let res = await fetch(`https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker.json`);
		let data = await res.json();
		items = data
		return items;
	}
    const dataPromise = getData();

	// this method allows us to specify keys that should not be searched and then search the results
	function searchResults(searchTerm, data) {
		var lowSearch = searchTerm.toLowerCase();
		let skipKeys = ['blurb'];
		let searchInDesiredKeys = data.filter(
			item => Object.entries(item).some(
				([key, val]) => ! skipKeys.includes(key) ? String(val).toLowerCase().includes(lowSearch) : false
			)
		);
		return searchInDesiredKeys;
	}

	// this allows us to specify a key that should be exactly matched to a value
	function matchResults(key, value, data) {
		let result = data.filter(item => item[key] === value);
		return result;
	}

	// create the promise result
	let searchTerm = '';
	$: filteredList = dataPromise.then((r) => {

		// filter the races and/or candidates by the search term
		let races = searchResults(searchTerm, items.races);
		let candidates = searchResults(searchTerm, items.candidates);

		let active_candidates = matchResults("dropped-out", false, candidates);
		let dropped_out_candidates = matchResults("dropped-out", true, candidates);
		if (showDroppedOutCandidates == true) {
			candidates = active_candidates.concat(dropped_out_candidates);
		} else {
			candidates = active_candidates;
		}

		// create array of race ids, parties, and party ids
		let all_race_ids = [...new Set(items.candidates.map(item => item["race-id"]))];
		let all_parties = [...new Set(items.candidates.map(item => item.party))];
		let all_party_ids = [...new Set(items.candidates.map(item => item["party-id"]))];

		// if there are no races but there are candidates, get the key from the candidate
		// then get the corresponding race and push it
		// after the loop, we still need to assign races to races
		if (races.length === 0 && candidates.length !== 0) {
			candidates.forEach(async function(candidate) {
				//let candidate_race = items.races[candidate["race-key"]]
				let candidate_race = items.races.find(item => item["office-id"] === candidate["race-id"]);
				races.push(candidate_race);
			});
			races = races;
		}

		// make the final data array of races and candidates, and parties and offices, for filteredList to use and return it
		let data = [];
		data["prefilteredRaces"] = items.races; // we need this for when there are no candidate results
		if ( typeof all_parties !== "undefined" ) {
			data["all_parties"] = all_parties;
		}
		if ( typeof all_party_ids !== "undefined" ) {
			data["all_party_ids"] = all_party_ids;
		}
		if ( typeof all_party_ids !== "undefined" && typeof all_parties !== "undefined" ) {
			let party_select = [];
			all_parties.forEach(function(party, index) {
				let party_choice = {
					value: all_party_ids[index],
					label: party,
					group: '' // if we want to group parties, populate this
				};
				party_select.push(party_choice);
			});
			data["party_select"] = party_select;
		}
		if ( typeof races !== "undefined" ) {
			data["races"] = races;
		}
		if ( typeof all_race_ids !== "undefined" ) {
			data["all_race_ids"] = all_race_ids;
		}
		if ( typeof races !== "undefined" ) {
			let race_select = [];
			races.forEach(function(race, index) {
				let race_choice = {
					value: race["office-id"],
					label: race.office,
					group: '' // if we want to group races (ex all house races, all senate races), populate this
				};
				race_select.push(race_choice);
			});
			data["race_select"] = race_select;
		}
		if ( typeof candidates !== "undefined" ) {
			data["candidates"] = candidates;
		}
		if ( typeof dropped_out_candidates !== "undefined" ) {
			data["dropped_out_candidates"] = dropped_out_candidates;
		}
		data["searchTerm"] = searchTerm;
		return data;
	});

	// whether to show candidates who have dropped out
	let showDroppedOutCandidates = false;

	// template router
	// Loop around all of the routes and create a new instance of
	// router for reach one with some rudimentary checks.
	routes.forEach(route => {
		router(
			route.path,
			// Set the params variable to the context.
			// We use this on the component initialisation
			(context, next) => {
				params = context.params
				next()
			},
			() => {
				results = route.component;
			}
		)
	});

	// Start the router
	// currently, if we don't use the hashbang, page reloads don't work
	router.start({
		hashbang: true
	});

	// router base
	/*
	if testing locally you can comment out the active router.base line.
	the actual WP post we need to use is:
	router.base('?p=2079676&preview=true');
	*/
	router.base('/elections/2022/02/whos-running-in-minnesota-in-2022');

	let selectParty;
	let selectOffice;

	// when the x is clicked, return to the main list
	function clearSelect(event) {
		router('/');
	}

	let selectedParty = undefined;
	function handlePartySelect(event) {
		selectOffice.handleClear();
		selectedParty = event.detail;
		router('/by-party/' + selectedParty.value);
	}
	
	let selectedOffice = undefined;
	function handleOfficeSelect(event) {
		selectParty.handleClear();
		selectedOffice = event.detail;
		router('/by-office/' + selectedOffice.value);
	}
	
</script>

<div class="m-filtering">
	<input placeholder="Search for a candidate, party, or race" class="a-filter-search" bind:value={searchTerm} />
</div>

<section class="container m-zones m-homepage-zones">
	{#await filteredList}
		Loading...
	{:then items}
		<div class="m-filtering">
			<div class="a-filter-select">
				<Select inputStyles="font-size: 1em; letter-spacing: inherit;" placeholder="Choose a party..." items={items.party_select} on:select={handlePartySelect} on:clear={clearSelect} bind:this="{selectParty}"></Select>
			</div>
			<div class="a-filter-select">
				<Select inputStyles="font-size: 1em; letter-spacing: inherit;" placeholder="Choose a race..."  items={items.race_select} on:select={handleOfficeSelect} on:clear={clearSelect} bind:this="{selectOffice}"></Select>
			</div>
		</div>
		{#if items.dropped_out_candidates.length > 0}
			<div class="a-filter-switch">
				<Switch bind:checked={showDroppedOutCandidates} id="show-dropped-out-candidates"></Switch> <label class="a-switch-toggle show-dropped-out-candidates" for="show-dropped-out-candidates"><small class="a-form-caption">Show candidates who have dropped out</small></label>
			</div>
		{/if}

		{#key params}
			<svelte:component this={results} params="{params}" items="{items}" />
		{/key}
	{/await}
</section>
