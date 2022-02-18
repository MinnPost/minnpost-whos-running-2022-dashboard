<style>
	.candidate {
		border: 1px solid #d6d6da;
		padding: 0.5em;
		border-radius: 4px;
		display: block;
		width: 100%;
	}

	.m-entry-excerpt {
		font-family: "ff-meta-serif-web-pro", georgia, cambria, "Times New Roman", times, serif;
	}

	.former-candidate {
		opacity: 0.6;
	}

	.candidate h4 {
		margin-top: 0;
	}
	.candidate p {
		margin-bottom: 0.75em;
	}

	.candidate-photo {
		float: right;
	}

	.candidate-photo img {
		max-width: 130px;
		border-radius: 50%;
	}

	.candidate-meta {
		font-weight: 700;
		margin-bottom: 0.25em;
		font-size: var(--scale-2);
		font-family: "ff-meta-web-pro", helvetica, arial, sans-serif;
		color: #5E6E76;
	}

	.candidate-meta div {
		margin-bottom: 0.25em;
	}

	.incumbent {color: #f74607;}
	.dropped-out .icon {color: #C83D2D;}
	.deg45 {
		transform: rotate(45deg);
		font-size: .7em;
	}
	
</style>

<script>
	// a single candidate record from AllCandidates.svelte, ByOffice.svelte, or ByParty.svelte
	export let candidate;

	const party_icons = {
		"republican": "republican",
		"dfl": "democrat",
		"legal-marijuana-now": "cannabis",
		"grassroots-legalize-cannabis": "cannabis",
		"green": "square deg45"
	};

	function parseDropoutDate (dateString) {
		let date = new Date(dateString);
		let options = {year: 'numeric', month: 'long', day: 'numeric'};
		return date.toLocaleString('en-US', options);
	}


</script>

<article class="m-post candidate" class:former-candidate={candidate["dropped-out"]}>
	
	{#if candidate["headshot-url"]}
		<figure class="candidate-photo">
			<img src="{candidate['headshot-url']}" alt="photo of {candidate.name}" width=130 height=130 loading=lazy />
		</figure>
	{/if}
	
	<h4 class="a-entry-title">{candidate.name}</h4>

	<div class="m-entry-meta candidate-meta">
		<div class="party-name party-{candidate["party-id"]}"><i class="fas fa-fw fa-{party_icons[candidate["party-id"]] ?? "circle"}"></i> {candidate.party}</div>

		{#if candidate.hometown}
		<div class="hometown"><i class="fas fa-fw fa-home"></i> Lives in: {candidate.hometown}</div>
		{/if}

		{#if candidate.incumbent}
		<div class="incumbent"><i class="fas fa-fw fa-star"></i> Incumbent</div>
		{/if}

		{#if candidate.endorsed}
		<div class="endorsed"><span class="icon party-{candidate["party-id"]}"><i class="fas fa-fw fa-check-square"></i></span> 
			Endorsed by <span class="party-{candidate["party-id"]}">{candidate.party} {#if candidate.party != "DFL"} Party{/if}</span></div>
		{/if}

		{#if candidate["dropped-out"]}
		<div class="dropped-out"><span class="icon"><i class="fas fa-fw fa-times"></i></span> Out of the race on {parseDropoutDate(candidate["date-dropped-out"])}</div>
		{/if}
	</div>
	
	{#if candidate.blurb}
	<div class="m-entry-excerpt blurb">
		<p>{@html candidate.blurb}</p>
		{#if candidate.website}
			<p><a href="{candidate.website}" target="_blank"><i class="fas fa-fw fa-globe"></i> Campaign website</a></p>
		{/if}
	</div>
	{/if}
</article>
