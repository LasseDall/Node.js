<script>
    export let child;
    export let onShowLove;
    export let onEatCookie;

    import { fridgeMessages } from "../../store/fridgeMessages";

    let customFridgeMessage = "";

    function submitFridgeMessage() {
        //fridgeMessages.set([...$fridgeMessages, customFridgeMessage]);
        fridgeMessages.update((storeValue) => {
            storeValue.push(customFridgeMessage);
            return storeValue
        });
        customFridgeMessage = "";
    }
</script>

<div 
    class:is-girl={child.isGirl}
    class:is-boy={!child.isGirl}
    class={child.blackSheep || "not-a-black-sheep"}
>
    <h3>{child.name}</h3>
</div>

<button on:click={() => onShowLove(child.name)}>Vis kærlighed</button>
<button on:click={() => onEatCookie(child.name)}>Eat cookie</button>
<input placeholder="Fridge message" bind:value={customFridgeMessage}>
<button on:click={submitFridgeMessage}>Submit fridge message</button>


<style>
    .is-boy {
        color: aqua;
    }

    .is-girl {
        color: chartreuse;
    }

    .not-a-balck-sheep {
        background-color: aquamarine;
    }

    .medium-balck-sheep {
        background-color: brown;
    }

    .ultra-balck-sheep {
        background-color: black;
    }
</style>