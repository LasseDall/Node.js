import { writable } from "svelte/store";

export const currentUserId = writable(null);
export const followedUsers = writable([]);
export const likedAlbums = writable([]);

