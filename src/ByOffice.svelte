<style>
  .candidates-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<script>
	// all data for candidates and races
    export let items;

	// page.js data, such as the office we want
	export let params;

	// the races from App.svelte
	let races = items.races;

	// the parties from App.svelte
	let parties = items.all_parties;

	// what office do we want?
    if (params && params.office) {
		races = [items.races.find(item => item["office-id"] === params["office"])];
    } else {
        // the distinct office names from the candidates
	    races = items.races;
    }

	// create a list of candidates for a office
	let office_candidates = function(office, party) {
		return items.candidates.filter(
			item => item["race-id"].indexOf(office) !== -1 && item["party"].indexOf(party) !== -1
		)
	}

	// single candidate template
    import Candidate from "./Candidate.svelte";

</script>

{#each races as race, key}
	<section>
		<h3>{race.office}</h3>
		<p>{race.blurb}</p>
		{#each parties as party}
			{#if office_candidates(race["office-id"], party).length > 0}
				<h4>{party}</h4>
				<section class="candidates-list">
					{#each office_candidates(race["office-id"], party) as candidate}
						<Candidate candidate = {candidate} />
					{/each}
				</section>
			{/if}
		{/each}
	</section>
{/each}
