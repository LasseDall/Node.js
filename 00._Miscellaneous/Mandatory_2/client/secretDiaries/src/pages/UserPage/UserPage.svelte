<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId, followedUsers } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToAlbum, navigateToReview, getStarGradient } from "../../assets/js/sharedMethods.js";
   
    const urlParams = new URLSearchParams(window.location.search);

    const username = urlParams.get('username');
    const userId = urlParams.get('id');
    const currentUser = $currentUserId;
    let followedUsersIds = $followedUsers;

    let userFollowed = followedUsersIds.find(user => user == userId);
    let usersLikedAlbums = [];
    let usersReviews = [];

    onMount(() => {
        getUsersLikedAlbums();
        getUsersReviews();
    });

    async function followUser() {

        const data = {
            id: currentUser,
            followUserId: userId
        };

        try {
            const response = await fetch(BASE_URL + `/api/follow-users`, {
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
                const result = await response.json();
                followedUsersIds.push(userId);
                followedUsers.set(followedUsersIds);
                userFollowed = 1;
                toastr["success"](`You are now following ${username}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    async function unfollowUser() {
        const data = {
            id: currentUser,
        };

        try {
            const response = await fetch(BASE_URL + `/api/follow-users/${userId}`, {
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
                const result = await response.json();
                followedUsersIds = followedUsersIds.filter(album => album != userId);
                followedUsers.set(followedUsersIds);
                userFollowed = undefined;
                toastr["success"](`You've unfollowed ${username}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getUsersLikedAlbums = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/follow-albums/${userId}`);

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
            const response = await fetch(BASE_URL + `/api/album-reviews/users/${userId}`);

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
<img src="/src/assets/images/user-icon.jpg" class="vinyl-icon" />
{#if userFollowed === undefined}
    <button on:click={() => followUser()}>Follow user</button>
{:else}
    <button on:click={() => unfollowUser()}>Unfollow user</button>
{/if}

{#each usersLikedAlbums as album}
  <div class="album-box" on:click={() => navigateToAlbum(album)}>
    <h3><img src="/src/assets/images/vinyl-icon.png" class="vinyl-icon" />{album.artist}: {album.title}</h3>
    <h3>{album.genre}</h3>
    <h3>{album.rating}</h3>
  </div>
{/each}

{#each usersReviews as usersReview}
  <div class="review-box" on:click={() => navigateToCreateReview(usersReview)}>
    <h3>{usersReview.artist}: {usersReview.title}</h3>
    {#each getStarGradient(usersReview.reviews_score) as gradient, i}
        <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
    <span>: {usersReview.reviews_text}</span>
  </div>
{/each}