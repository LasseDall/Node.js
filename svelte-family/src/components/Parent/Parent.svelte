<script>
    import Child from "../Child/Child.svelte";
    import { fridgeMessages } from "../../store/fridgeMessages";

    export let name;
    export let children;

    let cookieJar = ["Cookie", "Cookie", "Cookie", "Cookie"];

    function handleShowLove(childName) {
        console.log(`My name is ${name} and ${childName} loves me!`);
    }

    function handleEatCookie(childName) {
        console.log(`${childName} ate a cookie!`)
        cookieJar.pop();
        cookieJar = cookieJar;
        if (cookieJar.length < 1) {
            cookieJar = ["Cookie", "Cookie", "Cookie", "Cookie"];
            console.log(`${name} filled the cookie jar!`);
        }
    }

    function deleteFridgeMessages() {
        fridgeMessages.set(["Fridge Messages Below:"])
    }
</script>

<h1>{name}</h1>

<button on:click={deleteFridgeMessages}>Erase fridge messages</button>

<p>{cookieJar}</p>
 
{#each children as child}
    <Child child={child} onShowLove={handleShowLove} onEatCookie={handleEatCookie} />
{/each}
