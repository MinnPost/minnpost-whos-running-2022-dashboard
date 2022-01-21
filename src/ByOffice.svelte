<script>
    import Candidate from "./Candidate.svelte";
    export let params;
    export let items;

    // load the candidates from App.svelte
	let candidates = items.candidates;

    let offices = [];
    if (params.office) {
        offices = [params.office];
    } else {
        // the distinct office names from the candidates
	    offices = [...new Set(candidates.map(item => item["office-sought"]))];
    }

	// create a list of candidates for a office
	let office_candidates = function(office) {
		return candidates.filter(
			(item) => item["office-sought"].toUpperCase().indexOf(office.toUpperCase()) !== -1
		);
	}

</script>

{#each offices as office}
	<section class="candidates-list">
		<h3>{office}</h3>
		{#each office_candidates(office) as candidate}
			<Candidate candidate = {candidate} />
		{/each}
	</section>
{/each}
