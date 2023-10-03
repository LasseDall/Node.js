<script>
    import Traktor from "./lib/Traktor.svelte";
    import Ground from "./lib/Ground.svelte";
    import Farmer from "./lib/Farmer.svelte";

    const wheels = ["lille hjul ", "stort hjul "]
    const showTractor = true;
    const welcomeMessage = "Welcome";
    const name = "Lasse";
</script>

<h1 id="welcome-message">{welcomeMessage}</h1>
<h2>This is the main component</h2>

<Farmer {name}/>

{#if showTractor}
  <Traktor wheels={wheels} />
  <Ground />
{/if}

<style>
  #welcome-message {
    color: aquamarine;
  }
</style>
