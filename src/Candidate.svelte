<style>
	.candidate {
		border: 1px solid #d6d6da;
		margin-top: 0.5em;
		padding: 0.5em;
	}
</style>

<script>
	// a single candidate record from AllCandidates.svelte, ByOffice.svelte, or ByParty.svelte
	export let candidate;
</script>

<article class="m-post candidate">
	<header class="m-entry-header">
		{#if candidate["dropped-out"]}
			<span>dropped out on {candidate["date-dropped-out"]}</span>
		{/if}
		<h3 class="a-entry-title">{candidate.name}</h3>
	</header>
	{#if candidate.blurb != null}
		<div class="m-entry-excerpt">
			<p>{candidate.blurb}</p>
		</div>
	{/if}
</article>
