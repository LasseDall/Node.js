<script>
    import { navigateToReview, getStarGradient } from "../../assets/js/sharedMethods.js";
    import { reviews, currentUserId } from "../../stores/userStore.js";
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { onMount } from 'svelte';

    onMount(async () => {
        await updateVisibleReviews();
    });

    export let usersReviews = [];
    export let showMoreReviewsCount = 10;

    let albumsReviewed = $reviews;
    const currentUser = $currentUserId;

    let visibleReviews = [];

    $: if (usersReviews.length > 0) {
        updateVisibleReviews();
    }

    function updateVisibleReviews() {
        visibleReviews = usersReviews.slice(0, showMoreReviewsCount);
    }

    function showMoreReviews() {
        showMoreReviewsCount += 10;
        updateVisibleReviews();
    }

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
                usersReviews = usersReviews.filter(review => review.albums_id != albumId);
                toastr["success"](`You've deleted your review of ${title}!`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

</script>

{#if usersReviews.length === 0}
  <p>No reviews made by this user...</p>
{:else}
    {#each visibleReviews as usersReview}
        <div class="review-box" on:click={() => navigateToReview(usersReview)}>
            {#each getStarGradient(usersReview.reviews_score) as gradient, i}
                <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
            {/each}
            <span>: {usersReview.reviews_text.length > 50 ? `${usersReview.reviews_text.substring(0, 50)}...` : usersReview.reviews_text}</span>
        </div>
        <button on:click={() => deleteReview(usersReview.albums_id, usersReview.title)}>Delete review</button>
    {/each}
    {#if visibleReviews.length > showMoreReviewsCount}
        <button on:click|preventDefault={showMoreReviews}>Show more reviews</button>
    {/if}
{/if}