<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { currentUserId, followedUsers } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import ReviewedAlbums from "../../components/ReviewedAlbums/ReviewedAlbums.svelte";
    import AlbumComponent from "../../components/AlbumComponent/AlbumComponent.svelte";
   
    const urlParams = new URLSearchParams(window.location.search);

    const username = urlParams.get('username');
    const userId = urlParams.get('id');
    let followCount = urlParams.get('followCount');

    const currentUser = $currentUserId;
    let followedUsersIds = $followedUsers;

    let userFollowed = followedUsersIds.find(user => user == userId);
    let usersLikedAlbums = [];
    let usersReviews = [];

    const deleteButton = false;

    onMount(() => {
        getUsersLikedAlbums();
        getUsersReviews();
    });

    async function followUser() {

        const data = {
            id: currentUser,
            followUserId: userId
        }

        try {
            const response = await fetch($BASE_URL + `/api/follow-users`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
                
            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                followedUsersIds.push(userId);
                followedUsers.set(followedUsersIds);
                userFollowed = 1;
                followCount++;
                toastr["success"](`You are now following ${username}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    async function unfollowUser() {
        const data = {
            userId: currentUser,
            followUserId: userId
        }

        try {
            const response = await fetch($BASE_URL + `/api/follow-users/${userId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                followedUsersIds = followedUsersIds.filter(album => album != userId);
                followedUsers.set(followedUsersIds);
                userFollowed = undefined;
                followCount--;
                toastr["success"](`You've unfollowed ${username}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getUsersLikedAlbums = async () => {
        try {
            const response = await fetch($BASE_URL + `/api/follow-albums/${userId}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                usersLikedAlbums = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getUsersReviews = async () => {
        try {
            const response = await fetch($BASE_URL + `/api/album-reviews/users/${userId}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                usersReviews = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }
    
</script>

<h1>{username}</h1>
<div>
    <img src="/src/assets/images/user-icon.jpg" class="vinyl-icon" />
</div>
{#if userFollowed === undefined}
    <button class="button" on:click={() => followUser()}>Follow user</button>
{:else}
    <button class="button" on:click={() => unfollowUser()}>Unfollow user</button>
{/if}
<div class="followers">Followers: <b>{followCount}</b></div>

<h2>{username}'s liked albums:</h2>
<AlbumComponent albums={usersLikedAlbums} />

<h2>{username}'s reviews:</h2>
<ReviewedAlbums {usersReviews} />