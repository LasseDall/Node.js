import { writable } from "svelte/store";

const storedUserId = localStorage.getItem('currentUserId');
export const currentUserId = writable(storedUserId || null);
const storedUsername = localStorage.getItem('currentUserUsername');
export const currentUserUsername = writable(storedUsername || null);
const storedFollowedUsers = localStorage.getItem('followedUsers');
export const followedUsers = writable(storedFollowedUsers ? JSON.parse(storedFollowedUsers) : []);
const storedLikedAlbums = localStorage.getItem('likedAlbums');
export const likedAlbums = writable(storedLikedAlbums ? JSON.parse(storedLikedAlbums) : []);
const storedReviews = localStorage.getItem('userReviews');
export const reviews = writable(storedReviews ? JSON.parse(storedReviews) : []);

const storedData = localStorage.getItem('myData');
export const myStore = writable(storedData ? JSON.parse(storedData) : []);

currentUserId.subscribe((value) => {
  localStorage.setItem('currentUserId', value);
});

currentUserUsername.subscribe((value) => {
    localStorage.setItem('currentUsername', value);
});

followedUsers.subscribe((value) => {
    localStorage.setItem('followedUsers', JSON.stringify(value));
});

likedAlbums.subscribe((value) => {
    localStorage.setItem('likedAlbums', JSON.stringify(value));
});

reviews.subscribe((value) => {
    localStorage.setItem('userReviews', JSON.stringify(value));
});