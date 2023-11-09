<script>
    import { BASE_URL } from "../../store/global";
    import { navigate } from "svelte-navigator";

    let coffeeLoverName = "";
    
    async function submitCoffeeLoverName() {
        const response = await fetch($BASE_URL + "/api/coffeelovers", {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify({ coffeeLover: coffeeLoverName })
        });
        if (response.status === 200) {
            navigate("/who-dat-coffee-lover");
        }
        const result = await response.json();
        console.log(result);
    }

</script>

<input bind:value={coffeeLoverName}>
<button on:click={submitCoffeeLoverName}>Submit your name</button>