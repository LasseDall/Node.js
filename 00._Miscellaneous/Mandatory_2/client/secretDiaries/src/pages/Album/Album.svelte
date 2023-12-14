<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { currentUserId, likedAlbums, reviews } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToCreateReview, getStarGradient } from "../../assets/js/sharedMethods.js";
    import AlbumReviews from "../AlbumReviews/AlbumReviews.svelte";
   
    const urlParams = new URLSearchParams(window.location.search);

    const albumId = urlParams.get('id');
    const currentUser = $currentUserId;
    let likedAlbumsIds = $likedAlbums;
    let reviewedAlbumsId = $reviews;
    let albumReviews = [];

    let rating;
    let genre;
    let title;
    let artist;
    let year;
      
    let albumLiked = likedAlbumsIds.find(album => album == albumId);
    let albumReviewed = reviewedAlbumsId.find(review => review == albumId);

    onMount(async () => {
        getAlbumReviews();
        updateAlbumLikadAndAlbumReviewed();
        await getAlbum();
    });

    async function getAlbum() {
        try {
            const response = await fetch($BASE_URL + `/api/albums/${albumId}`, {
                credentials: "include" 
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                rating = result.data.rating;
                genre = result.data.genre;
                title = result.data.title;
                artist = result.data.artist;
                year = result.data.year;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    function updateAlbumLikadAndAlbumReviewed() {
        likedAlbumsIds = $likedAlbums;
        reviewedAlbumsId = $reviews;
        albumLiked = likedAlbumsIds.find(album => album == albumId);
        albumReviewed = reviewedAlbumsId.find(review => review == albumId);
    }


    async function likeAlbum() {
        const data = {
            id: currentUser,
            albumId
        }

        try {
            const response = await fetch($BASE_URL + `/api/follow-albums`, {
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
            likedAlbumsIds.push(albumId);
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
        }

        try {
            const response = await fetch($BASE_URL + `/api/follow-albums/${albumId}`, {
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
                likedAlbumsIds = likedAlbumsIds.filter(album => album != albumId);
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
            const response = await fetch($BASE_URL + `/api/album-reviews/albums/${albumId}`, {
                credentials: 'include'
            });

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
    <button on:click={() => navigateToCreateReview(albumId, title, artist)}>Review album</button>    
{/if}

<AlbumReviews {albumReviews} />