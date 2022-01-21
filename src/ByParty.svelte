<script>
    // all data for candidates and races
    export let items;

	// page.js data, such as the party we want
	export let params;

	// the candidates from App.svelte
	let candidates = items.candidates;

	// what party/parties do we want
    let parties = [];
    if (params && params.party) {
        parties = [params.party];
    } else {
        // the distinct party names from the candidates
	    parties = items.all_parties;
    }

	// create a list of candidates for a party
	let party_candidates = function(party) {
		return candidates.filter(
			(item) => item["party"].toUpperCase().indexOf(party.toUpperCase()) !== -1
		);
	}

	// single candidate template
	import Candidate from "./Candidate.svelte";

</script>

{#each parties as party}
	<section class="candidates-list">
		<h3>{party}</h3>
		{#each party_candidates(party) as candidate}
			<Candidate candidate = {candidate} />
		{/each}
	</section>
{/each}
