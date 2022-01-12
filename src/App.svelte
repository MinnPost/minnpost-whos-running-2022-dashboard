<script type="text/javascript">
	import { onMount } from "svelte";

	let allRaces =[];
	let races = [];

	onMount(async function() {
		const response = await fetch(` https://s3.amazonaws.com/data.minnpost/projects/minnpost-whos-running-2022/candidate-tracker-sample-data.json`);
		const json = await response.json();
		races = json;
	});
</script>

{#if races.length === 0}
	<div class="loading-container">
		Races loading...
	</div> 
{:else}
	{#each races as race}
		<h2>{race.office}</h2>
	{/each}
{/if}