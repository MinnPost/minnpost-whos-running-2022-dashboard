<style>
	.candidate {
		border: 1px solid #d6d6da;
		margin-top: 0.5em;
		padding: 0.75em;
		border-radius: .5em;
		flex: 400px;
		max-width: 400px;
		margin-right:1em;
	}

	.former-candidate {
		opacity: 0.6;
	}

	.candidate h3 {
		margin-bottom: 0.25em;
	}

	.candidate-photo {
		float: right;
	}

	.candidate-photo img {
		max-width: 100px;
		border-radius: 200px;
	}

	.candidate-meta {
		font-family: Helvetica, Arial, sans-serif;
		font-size: .7em;
		font-weight: 700;
		margin-bottom:0.5em;
		color: #404040;
	}

	.incumbent {color: #f74607;}
	.dropped-out .icon {color: #C83D2D;}

	.blurb {
		font-size: .8em;
	}
	
</style>

<script>
	// a single candidate record from AllCandidates.svelte, ByOffice.svelte, or ByParty.svelte
	export let candidate;

	const party_icons = {
		"republican": "republican",
		"dfl": "democrat",
		"legal-marijuana-now": "cannabis",
		"grassroots-legalize-cannabis": "cannabis"
	};

	function parseDropoutDate (dateString) {
		let date = new Date(dateString);
		let options = {year: 'numeric', month: 'long', day: 'numeric'};
		return date.toLocaleString('en-US', options);
	}


</script>

<div class="candidate" class:former-candidate={candidate["dropped-out"]}>
	<div class="candidate-photo">
		{#if candidate["headshot-url"]}
			<img src="{candidate['headshot-url']}" alt="photo of {candidate.name}" />
		{/if}
	</div>
	
	<h4>{candidate.name}</h4>

	<div class="candidate-meta">
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
		<div class="dropped-out"><span class="icon"><i class="fas fa-fw fa-times"></i></span> Dropped out of the race on {parseDropoutDate(candidate["date-dropped-out"])}</div>
		{/if}
	</div>
	{#if candidate.blurb}
	<div class="blurb">
		<p>{@html candidate.blurb}</p>
	</div>
	{/if}
</div>
