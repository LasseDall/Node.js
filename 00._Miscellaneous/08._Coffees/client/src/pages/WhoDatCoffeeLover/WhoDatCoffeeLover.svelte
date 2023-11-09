<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/global";

    let coffeeLoverName;
    onMount(async () => {
        const response = await fetch($BASE_URL + "/api/coffeelovers", {
            credentials: "include" //Session-id'et sendes med, så session virker
        });
        const result = await response.json();
        coffeeLoverName = result.data;
    })
</script>

{#if !coffeeLoverName}
<h1>Who dis?</h1>
{:else}
<h1>{coffeeLoverName} loves coffee!</h1>
{/if}