<script>
	import PartyCandidates from "./PartyCandidates.svelte";

	// candidates from App.svelte
	export let candidates;

	// the distinct party names from the candidates
	let parties = [...new Set(candidates.map(item => item.party))];

</script>

{#each parties as party}
	<section class="candidates-list">
		<h3>{party}</h3>
		<PartyCandidates
			party_candidates = {candidates.filter(
				(item) => item["party"].toUpperCase().indexOf(party.toUpperCase()) !== -1
			)}
		/>
	</section>
{/each}
