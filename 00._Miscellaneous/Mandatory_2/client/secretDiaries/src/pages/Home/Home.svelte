<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId, followedUsers, reviews, likedAlbums } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToAlbum, navigateToReview, navigateToUser, getStarGradient } from "../../assets/js/sharedMethods.js";

    const currentUser = $currentUserId;
    let followedUsersIds = $followedUsers;
    let albumsReviewed = $reviews;
    let likedAlbumsIds = $likedAlbums;

    let currentUsersLikedAlbums = [];
    let currentUsersReviews = [];
    let currentUsersFollowedUsers = [];

    onMount(() => {
        getCurrentUsersFollowedUsers();
        getCurrentUsersLikedAlbums();
        getCurrentUsersReviews();
    });

    const getCurrentUsersLikedAlbums = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/follow-albums/${currentUser}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                currentUsersLikedAlbums = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getCurrentUsersReviews = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/album-reviews/users/${currentUser}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                currentUsersReviews = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getCurrentUsersFollowedUsers = async () => {
      try {
        const response = await fetch(BASE_URL + `/api/follow-users/${currentUser}`, {
          credentials: 'include'
        });
  
        if (!response.ok) {
          const result = await response.json();
          toastr["error"](result.data);
        } else {
          const result = await response.json();
          currentUsersFollowedUsers = result.data;
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    };

    async function deleteReview(albumId, title) {
        const data = {
            id: currentUser,
        };

        try {
            const response = await fetch(BASE_URL + `/api/album-reviews/${albumId}`, {
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
                albumsReviewed = albumsReviewed.filter(review => review != albumId);
                reviews.set(albumsReviewed);
                console.log($reviews, albumsReviewed)
                currentUsersReviews = currentUsersReviews.filter(review => review.albums_id != albumId);
                toastr["success"](`You've deleted your review of ${title}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }
    

</script>
<h1>HOME</h1>

{#each currentUsersLikedAlbums as likedAlbum}
  <div class="album-box" on:click={() => navigateToAlbum(likedAlbum)}>
    <h3>{likedAlbum.artist}: {likedAlbum.title}</h3>
  </div>
{/each}

{#each currentUsersFollowedUsers as followedUser}
  <div class="user-box" on:click={() => navigateToUser(followedUser)}>
    <h3>{followedUser.username}</h3>
  </div>
{/each}

{#each currentUsersReviews as usersReview}
  <div class="review-box" on:click={() => navigateToReview(usersReview)}>
    {#each getStarGradient(usersReview.reviews_score) as gradient, i}
        <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
  <span>: {usersReview.reviews_text}</span>
  </div>
  <button on:click={() => deleteReview(usersReview.albums_id, usersReview.title)}>Delete review</button>
{/each}


