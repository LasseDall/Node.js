import { writable } from "svelte/store";

export const initialChatRooms = [
    {
        name: "General room",
        users: [],
        messages: []
    },
];

export const chatRooms = writable(initialChatRooms);

export function addChatRoom(roomName) {
    chatRooms.update((rooms) => {
        rooms.push({ 
            name: roomName, 
            messages: []
        });
        return rooms;
    });
}