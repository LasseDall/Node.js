<script>
    import { currentUserId, currentUserUsername } from "../../stores/userStore.js";
    import { chatRooms, addChatRoom } from "../../stores/chatStore.js";
    import { onDestroy, onMount } from 'svelte';
    import io from "socket.io-client";

    const currentUser = $currentUserId;
    let currentRoom = "General room";
    let message = "";
    let newRoomName = "";
    
    const socket = io("http://localhost:3001", {
        path: "/socket.io/",
        withCredentials: true
    });

    onMount(() => {
        socket.emit("join-room", currentRoom);
    });

    onDestroy(() => {
        socket.disconnect();
    });

    const handleSendMessage = () => {
        socket.emit("client-send-a-message", { message: message, room: currentRoom });
    }

    const handleAddRoom = () => {
        if (newRoomName.trim() !== "") {
            addChatRoom(newRoomName.trim());
            currentRoom = newRoomName;
            socket.emit("join-room", currentRoom);
            newRoomName = "";
        }
    }

    socket.on("server-send-a-message", (data) => {
        chatRooms.update(rooms => {
            const roomIndex = rooms.findIndex(room => room.name === data.roomName);
            if (roomIndex !== -1) {
                rooms[roomIndex].messages.push({ name: data.name, message: data.message });
            }
            return rooms;
        });
    });

    socket.on("server-update-rooms", (updatedRooms) => {
        chatRooms.update((existingRooms) => {
            if (typeof updatedRooms === "object" && updatedRooms !== null) {
                Object.entries(updatedRooms).forEach(([roomName, roomData]) => {
                    if (!existingRooms.some(room => room.name === roomName)) {
                        existingRooms.push({
                            name: roomName,
                            messages: roomData.messages || [],
                            users: roomData.users || [],
                        });
                    }
                });
            }
            return existingRooms;
        });
    });


    socket.on("server-update-users", (users) => {
        chatRooms.update(rooms => {
            const roomIndex = rooms.findIndex(room => room.name === currentRoom);
            if (roomIndex !== -1) {
                rooms[roomIndex].users = users;
            }
            return rooms;
        });
    });

    function joinUser() {
        socket.emit("join-room", currentRoom);
    }
</script>
<span><b>Select room:</b></span>

    <select bind:value={currentRoom} on:change={joinUser}>
        {#each $chatRooms as room}
            <option value={room.name}>{room.name}</option>
        {/each}
    </select>
    
    <div class="chat-messages-div">
        {#if $chatRooms && $chatRooms.length > 0}
            {#each $chatRooms as room (room.name)}
                {#if (room.name === currentRoom)}
                    {#each room.messages as chat}
                        {#if (chat.name === $currentUserUsername)}
                            <div class="chat-message" style="text-align: right;"><b>{chat.name}:</b> {chat.message}</div>
                        {:else}
                            <div class="chat-message" style="text-align: left;"><b>{chat.name}:</b> {chat.message}</div>
                        {/if}
                    {/each}
                {/if}
            {/each}
        {/if}
    </div>
    
    <div class="chat-input-div">
        <textarea name="chat-text" cols="30" rows="3" placeholder="Chat" bind:value={message}></textarea>
        <button class="button" on:click|preventDefault={handleSendMessage}>Send message</button>
    </div>

    <div>
        <input type="text" bind:value={newRoomName} placeholder="New room">
        <button class="button" on:click|preventDefault={handleAddRoom}>Add new room</button>
    </div>