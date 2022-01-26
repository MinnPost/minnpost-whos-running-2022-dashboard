<style>
	.candidate {
		border: 1px solid #d6d6da;
		margin-top: 0.5em;
		padding: 0.5em;
	}

	.candidate h3 {
		margin-bottom: 0.25em;
	}

	.candidate-meta {
		font-family: Helvetica, Arial, sans-serif;
		font-size: .7em;
		font-weight: 700;
		margin-bottom:0.5em;
		color: #404040;
	}

	.party-name {
		color: #666666;
	}
	.party-dfl {color: #0793AB;}
	.party-republican {color: #A1000F}
	.party-legal-marijuana-now {color: #286806;}
	.party-grassroots-legalize-cannabis {color: #41AB07;}

	.incumbent {color: #f74607;}

	.dropped-out {
		color: #ccc;
		border-color: #ccc;
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


</script>

<div class="candidate" class:dropped-out={candidate["dropped-out"]}>
	<h3>{candidate.name}</h3>
	<div class="candidate-meta">
		<div class="party-name party-{candidate["party-id"]}"><i class="fas fa-fw fa-{party_icons[candidate["party-id"]] ?? "circle"}"></i> {candidate.party}</div>

		{#if candidate.incumbent}
		<div class="incumbent"><i class="fas fa-fw fa-star"></i> Incumbent</div>
		{/if}

		{#if candidate.endorsed}
		<div class="endorsed"><span class="party-{candidate["party-id"]}"><i class="fas fa-fw fa-check-square"></i></span> 
			Endorsed by <span class="party-{candidate["party-id"]}">{candidate.party} {#if candidate.party != "DFL"} Party{/if}</span></div>
		{/if}

		{#if candidate["dropped-out"]}
		<span>dropped out on {candidate["date-dropped-out"]}</span>
		{/if}
	</div>
	{#if candidate.blurb != null}
	<div class="blurb">
		<p>{candidate.blurb}</p>
	</div>
	{/if}
</div>
