<script>
    import { currentUserId } from "../../stores/userStore.js";
    import { chatList } from "../../stores/chatStore.js";
    
    import io from "socket.io-client";
    
    const socket = io("http://localhost:3001", {
        path: "/socket.io/"
    });
    

    

    const handleChooseColor = () => {
        socket.emit("client-choose-a-color", { name: $currentUserId });
    }

    socket.on("server-sent-a-color", (data) => {
        chatList.update(chats => {
            chats.push({ name: data.name });
            return chats;
        });
    });
</script>

<button on:click|preventDefault={handleChooseColor}>Choose color</button>

{#each $chatList as chat}
    <h4>{chat.name}</h4>
{/each}