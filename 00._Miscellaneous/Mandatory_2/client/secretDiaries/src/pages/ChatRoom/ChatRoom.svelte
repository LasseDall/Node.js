<script>
    import { currentUserId, currentUserUsername } from "../../stores/userStore.js";
    import { chatList } from "../../stores/chatStore.js";
    import { onDestroy } from 'svelte';
    
    import io from "socket.io-client";

    const currentUser = $currentUserId;
    let message = "";
    
    const socket = io("http://localhost:3001", {
        path: "/socket.io/",
        withCredentials: true
    });
    
    onDestroy(() => {
        socket.disconnect();
    });

    const handleSendMessage = () => {
        socket.emit("client-send-a-message", { message: message });
    }

    socket.on("server-send-a-message", (data) => {
        chatList.update(chats => {
            chats.push({ name: data.name, message: data.message });
            return chats;
        });
    });
</script>

<div class="chat-messages-div">
    {#each $chatList as chat}
        {#if (chat.name == $currentUserUsername)}
            <div style="text-align: right;">{chat.name}: {chat.message}</div>
        {:else}
            <div style="text-align: left;">{chat.name}: {chat.message}</div>
        {/if}
    {/each}
</div>

<div class="chat-input-div">
    <input type="text" bind:value={message} />
    <button on:click|preventDefault={handleSendMessage}>Send message</button>
</div>