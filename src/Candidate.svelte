<style>
	.candidate {
		border: 1px solid #ddd;
		margin: 0.5em 0 1.5em 0;
		padding: 0.5em;
	}
</style>

<script>
	// a single candidate record from AllCandidates.svelte, ByOffice.svelte, or ByParty.svelte
	export let candidate;
</script>

<article class="candidate">
	{#if candidate["dropped-out"]}
		<span>dropped out on {candidate["date-dropped-out"]}</span>
	{/if}
	<h4>{candidate.name}</h4>
	{#if candidate.blurb != null}
		<p>{candidate.blurb}</p>
	{/if}
</article>
