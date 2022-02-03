<script>
	// all data for candidates and races
    export let items;

	// page.js data, such as the office we want
	export let params;

	// the races from App.svelte
	let races = items.races;

	// what office do we want?
	let office = {};
    if (params && params.office) {
		office = items.prefilteredRaces.find(item => item["office-id"] === params["office"]);
		races = [office];
    } else {
        // the distinct office names from the candidates
	    races = items.races;
    }

	// create a list of candidates for an office
	let office_candidates = function(office, party = '') {
		if ( party !== '') {
			return items.candidates.filter(
				item => item["race-id"].indexOf(office) !== -1 && item["party"].indexOf(party) !== -1
			)
		} else {
			return items.candidates.filter(
				item => item["race-id"].indexOf(office) !== -1
			)
		}
	}

	// the distinct parties from this list of candidates
	let office_candidate_parties = function(candidates) {
		return [...new Set(candidates.map(value => value["party"]))];
	}

	// single candidate template
    import Candidate from "./Candidate.svelte";

	// link to go back to unfiltered list
    //import LinkToFullCandidateList from "./components/LinkToFullCandidateList.svelte";

</script>

{#if office}
	<aside class="m-search-result-info">
		{#if items["searchTerm"] != ""}
			Showing {office_candidates(office["office-id"]).length} {#if office_candidates(office["office-id"]).length == 1}search result{:else}search results{/if} for <strong>{items.searchTerm}</strong> within all {office["office"]} candidates.
		{:else}
			Showing {office_candidates(office["office-id"]).length} <strong>{office["office"]}</strong> {#if office_candidates(office["office-id"]).length == 1}candidate{:else}candidates{/if} in {office_candidate_parties(office_candidates(office["office-id"])).length} {#if office_candidate_parties(office_candidates(office["office-id"])).length == 1}party{:else}parties{/if}.
		{/if}
	</aside>
{/if}

{#each races as race, key}
	<section class="race-listing">
		{#if race}
			{#if races.length > 1}
				<h2 class="m-archive-header">{race.office}</h2>
			{/if}
			{#if race.blurb}
				<p>{@html race.blurb}</p>
			{/if}
			{#each office_candidate_parties(office_candidates(race["office-id"])) as party, key}
				{#if office_candidates(race["office-id"], party).length > 0}
					<section class="m-archive m-archive-homepage m-zone m-zone-homepage-more-top candidates-list">
						<h3 class="m-archive-header party-{office_candidate_parties(office_candidates(race["office-id"]))[key].toLowerCase()}">{party}</h3>
						{#each office_candidates(race["office-id"], party) as candidate}
							<Candidate candidate = {candidate} />
						{/each}
					</section>
				{/if}
			{/each}
		{/if}
	</section>
{/each}
