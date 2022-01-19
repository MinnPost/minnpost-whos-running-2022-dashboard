<script>
	// candidate from PartyCandidates.svelte
	export let candidate;
</script>

<article class="candidate">
	<h4>{candidate.name}</h4>
	<p>{candidate.blurb}</p>
</article>
