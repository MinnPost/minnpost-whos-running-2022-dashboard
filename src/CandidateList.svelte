<script>

	import Candidate from "./Candidate.svelte";

	// load the candidates from App.svelte
	export let candidates;

	// create a list of candidates for a party
	let party_candidates = function(party) {
		return candidates.filter(
			(item) => item["party"].toUpperCase().indexOf(party.toUpperCase()) !== -1
		);
	}

	// the distinct party names from the candidates
	let parties = [...new Set(candidates.map(item => item.party))];

</script>

{#each parties as party}
	<section class="candidates-list">
		<h3>{party}</h3>
		{#each party_candidates(party) as candidate}
			<Candidate candidate = {candidate} />
		{/each}
	</section>
{/each}
