<script>

  import Candidate from "./Candidate.svelte";

  export let candidates;
  let parties = Object.keys(candidates);
</script>

{#each parties as party}
  <div class="candidates-list">
    <h3>{party}</h3>
    {#each candidates[party] as candidate}
      <Candidate candidate = {candidate}/>
    {/each}
  </div>
{/each}