<script>
    // all data for candidates and races
    export let items;

    // the candidates from App.svelte
	let candidates = items.candidates;

    // the distinct party names from the candidates
    let parties = [...new Set(candidates.map(item => item.party))];

    // create a list of candidates for a party
	let party_candidates = function(party, office) {
		return items.candidates.filter(
			item => item["party"].indexOf(party) !== -1 && item["office-sought"].indexOf(office) !== -1
		)
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
    import LinkToFullCandidateList from "./components/LinkToFullCandidateList.svelte";
    
</script>

{#if items["searchTerm"] != ""}
    <aside class="m-search-result-info">
        Showing {items.candidates.length} {#if items.candidates.length == 1}candidate{:else}candidates{/if} in {items.races.length} {#if items.races.length == 1}race{:else}races{/if} for <strong>{items["searchTerm"]}</strong>.
    </aside>
{/if}

{#each items.races as race}
    <section class="race-listing">
        <h2 class="m-archive-header">{race.office}</h2>
        {#if race.blurb}
            <p>{@html race.blurb}</p>
        {/if}
        {#each office_candidate_parties(office_candidates(race["office-id"])) as party, key}
            {#if party_candidates(party, race.office).length > 0}
                <section class="m-archive m-archive-homepage m-zone m-zone-homepage-more-top candidates-list">
                    <h3 class="m-archive-header party-{office_candidate_parties(office_candidates(race["office-id"]))[key].toLowerCase()}">{party}</h3>
                    {#each party_candidates(party, race.office) as candidate}
                        <Candidate candidate = {candidate} />
                    {/each}
                </section>
            {/if}
        {/each}
    </section>
{/each}
