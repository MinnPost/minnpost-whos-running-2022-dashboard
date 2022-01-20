<script>
	import Candidate from "./Candidate.svelte";

	// party candidates from CandidateList.svelte
	export let party_candidates;
</script>

{#each party_candidates as candidate}
	<Candidate candidate = {candidate} />
{/each}
