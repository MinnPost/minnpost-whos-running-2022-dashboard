<script>
	// all data for candidates and races
    export let items;

	// page.js data, such as the office we want
	export let params;

	// the candidates from App.svelte
	let candidates = items.candidates;

	// the races from App.svelte
	let races = items.races;

	// what office do we want?
    if (params && params.office) {
		races = [items.races[params.office]];
    } else {
        // the distinct office names from the candidates
	    races = items.races;
    }

	// create a list of candidates for a office
	let office_candidates = function(office) {
		return candidates.filter(
			(item) => item["office-sought"].indexOf(office) !== -1
		);
	}

	// single candidate template
    import Candidate from "./Candidate.svelte";

</script>

{#each races as race, key}
	<section class="candidates-list">
		<h3>{race.office}</h3>
		{#each office_candidates(race.office) as candidate}
			<Candidate candidate = {candidate} />
		{/each}
	</section>
{/each}
