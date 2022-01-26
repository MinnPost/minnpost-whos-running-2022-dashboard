<script>
    // all data for candidates and races
    export let items;

	// page.js data, such as the party we want
	export let params;

	// the races from App.svelte
	let races = items.races;

	// what party/parties do we want
    let parties = [];
    if (params && params.party) {
		let key = items.all_party_ids.indexOf(params.party);
		parties = [items.all_parties[key]];
    } else {
        // the distinct party names from the candidates
	    parties = items.all_parties;
    }

	// create a list of candidates for a party
	let party_candidates = function(party, office = '') {
		if (office != '') {
			return items.candidates.filter(
				item => item["party"].indexOf(party) !== -1 && item["office-sought"].indexOf(office) !== -1
			)
		} else {
			return items.candidates.filter(
				item => item["party"].indexOf(party) !== -1
			)
		}
	}

	// the distinct races from this list of candidates
	let party_candidate_races = function(candidates) {
		return candidates.map(value => value["office-sought"]);
	}

	// single candidate template
	import Candidate from "./Candidate.svelte";

</script>
{#if parties.length == 1}
	<aside class="m-search-result-info">
		Showing {party_candidates(parties[0]).length} {#if party_candidates(parties[0]).length == 1}candidate{:else}candidates{/if} in {party_candidate_races(party_candidates(parties[0])).length} {#if party_candidate_races(party_candidates(parties[0])).length == 1}race{:else}races{/if} for <strong>{parties[0]}</strong>
	</aside>
{/if}

{#each parties as party}
	<section class="candidates-list">
		{#if parties.length > 1}
			<h2>{party}</h2>
		{/if}
		{#each races as race, key}
			{#if party_candidates(party, race.office).length > 0}
				<section class="candidates-list">
					<h4>{race.office}</h4>
					<p>{race.blurb}</p>
					{#each party_candidates(party, race.office) as candidate}
						<Candidate candidate = {candidate} />
					{/each}
				</section>
			{/if}
		{/each}
	</section>
{/each}
