<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId, likedAlbums, reviews } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToReview, navigateToCreateReview, getStarGradient } from "../../assets/js/sharedMethods.js";
   
    const urlParams = new URLSearchParams(window.location.search);

    const title = urlParams.get('title');
    const artist = urlParams.get('artist');
    const genre = urlParams.get('genre');
    const rating = urlParams.get('rating');
    const id = urlParams.get('id');
    const currentUser = $currentUserId;
    let likedAlbumsIds = $likedAlbums;
    let reviewedAlbumsId = $reviews;
    let albumReviews = [];
  
    let albumLiked = likedAlbumsIds.find(album => album == id);
    let albumReviewed = reviewedAlbumsId.find(review => review == id);

    onMount(() => {
        getAlbumReviews();
        updateAlbumLikadAndAlbumReviewed();
    });

    function updateAlbumLikadAndAlbumReviewed() {
        likedAlbumsIds = $likedAlbums;
        reviewedAlbumsId = $reviews;
        albumLiked = likedAlbumsIds.find(album => album == id);
        albumReviewed = reviewedAlbumsId.find(review => review == id);
        console.log(albumLiked, albumReviewed)
    }


    async function likeAlbum() {
        const data = {
            id: currentUser,
            albumId: id
        };

        try {
            const response = await fetch(BASE_URL + `/api/follow-albums`, {
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
            likedAlbumsIds.push(id);
            likedAlbums.set(likedAlbumsIds);
            albumLiked = 1;
            toastr["success"](`You've liked ${title}!`);
        }
        } catch (error) {
            toastr["error"](error.message);
        }
    }


    async function unlikeAlbum() {
        const data = {
            id: currentUser,
        };

        try {
            const response = await fetch(BASE_URL + `/api/follow-albums/${id}`, {
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
                likedAlbumsIds = likedAlbumsIds.filter(album => album != id);
                likedAlbums.set(likedAlbumsIds);
                albumLiked = undefined;
                toastr["success"](`You've unliked ${title}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getAlbumReviews = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/album-reviews/albums/${id}`);

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                albumReviews = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

</script>

<h1>{artist}: {title}</h1>
<img src="/src/assets/images/vinyl-icon.png" class="vinyl-icon" />
<h2>{genre}</h2>
<h3>{rating}</h3>
<div>
    {#each getStarGradient(rating) as gradient, i}
      <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
</div>
{#if albumLiked === undefined}
    <button on:click={() => likeAlbum()}>Like album</button>
{:else}
    <button on:click={() => unlikeAlbum()}>Unlike album</button>
{/if}

{#if albumReviewed == undefined}
    <button on:click={() => navigateToCreateReview(id, title, artist)}>Review album</button>    
{/if}

{#each albumReviews as albumReview}
  <div class="review-box" on:click={() => navigateToReview(albumReview)}>
    <span>{albumReview.username}</span>
    {#each getStarGradient(albumReview.reviews_score) as gradient, i}
      <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
    <span>: {albumReview.reviews_text}</span>
  </div>
{/each}