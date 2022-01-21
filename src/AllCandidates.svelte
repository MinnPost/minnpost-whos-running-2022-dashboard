<script>
    // all data for candidates and races
    export let items;

    // the candidates from App.svelte
	let candidates = items.candidates;

    // the distinct party names from the candidates
    let parties = items.all_parties;

    // create a list of candidates for a party
    let party_candidates = function(party) {
        return candidates.filter(
            (item) => item["party"].toUpperCase().indexOf(party.toUpperCase()) !== -1
        );
    }

    // single candidate template
	import Candidate from "./Candidate.svelte";

</script>

{#each items.races as race}
    <section>
        <h2>{race.office}</h2>
        <p>{race.blurb}</p>
        {#each parties as party}
            <section class="candidates-list">
                <h3>{party}</h3>
                {#each party_candidates(party) as candidate}
                    <Candidate candidate = {candidate} />
                {/each}
            </section>
        {/each}
    </section>
{/each}
