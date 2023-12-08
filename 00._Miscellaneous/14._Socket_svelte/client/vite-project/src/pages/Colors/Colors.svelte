<script>
    import ColorsList from "../../components/ColorsList/ColorsList.svelte";
    import { colorsList } from "../../stores/colorsStore.js";
    import { currentUser } from "../../stores/usersStore.js";
    
    import io from "socket.io-client";
    const socket = io("localhost:8080");
    
    let color;

    function handleChooseColor() {
        socket.emit("client-choose-a-color", { data: color, name: $currentUser });
    }

    socket.on("server-sent-a-color", (data) => {
        // Ikke dom i svelte nomralt
        document.body.style.backgroundColor = data.data;
        colorsList.update(colors => {
            colors.push({ color: data.data, name: data.name });
            return colors
        });
    });
</script>

<input type="color" bind:value={color}>
<button on:click={handleChooseColor}>Choose color</button>

{#each $colorsList as colorsListItem}
    <h4 style="background-color: {colorsListItem.color};">{colorsListItem.name}</h4>
{/each}