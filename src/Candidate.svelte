<script>
	// a single candidate record from AllCandidates.svelte, ByOffice.svelte, or ByParty.svelte
	export let candidate;
</script>

<article class="candidate">
	<h4>{candidate.name}</h4>
	{#if candidate.blurb != null}
		<p>{candidate.blurb}</p>
	{/if}
</article>
