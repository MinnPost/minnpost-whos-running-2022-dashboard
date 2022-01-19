<script>

  import Candidate from "./Candidate.svelte";

  export let candidates;
  let parties = Object.keys(candidates);
</script>

{#each candidates as candidate}
<Candidate candidate = {candidate}/>
{/each}