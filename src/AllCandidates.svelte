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

    // single candidate template
	import Candidate from "./Candidate.svelte";
    
</script>

{#if items["searchTerm"] != ""}
    <aside class="m-search-result-info">
        Showing {items.candidates.length} {#if items.candidates.length == 1}candidate{:else}candidates{/if} in {items.races.length} {#if items.races.length == 1}race{:else}races{/if} for <strong>{items["searchTerm"]}</strong>
    </aside>
{/if}

{#each items.races as race}
    <section>
        <h2>{race.office}</h2>
        <p>{race.blurb}</p>
        {#each parties as party, key}
            {#if party_candidates(party, race.office).length > 0}
                <section class="candidates-list">
                    <h3 class="party-{items.all_party_ids[key]}">{party}</h3>
                    {#each party_candidates(party, race.office) as candidate}
                        <Candidate candidate = {candidate} />
                    {/each}
                </section>
            {/if}
        {/each}
    </section>
{/each}
