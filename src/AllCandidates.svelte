<script>
    import { onMount } from 'svelte';
    import CandidateList from "./CandidateList.svelte";
    export let items;
</script>

{#each items.races as race}
    <section>
        <h2>{race.office}</h2>
        <p>{race.blurb}</p>
        <CandidateList
            candidates = {items.candidates.filter(
                (item) => item["office-sought"].toUpperCase().indexOf(race.office.toUpperCase()) !== -1
            )}
        />
    </section>
{/each}