<script>
	// all data for candidates and races
    export let items;

	// page.js data, such as the office we want
	export let params;

	// the candidates from App.svelte
	let candidates = items.candidates;

	// what office(s) do we want
    let offices = [];
    if (params && params.office) {
        offices = [params.office];
    } else {
        // the distinct office names from the candidates
	    offices = items.all_offices;
    }

	// create a list of candidates for a office
	let office_candidates = function(office) {
		return candidates.filter(
			(item) => item["office-sought"].toUpperCase().indexOf(office.toUpperCase()) !== -1
		);
	}

	// single candidate template
    import Candidate from "./Candidate.svelte";

</script>

{#each offices as office}
	<section class="candidates-list">
		<h3>{office}</h3>
		{#each office_candidates(office) as candidate}
			<Candidate candidate = {candidate} />
		{/each}
	</section>
{/each}
