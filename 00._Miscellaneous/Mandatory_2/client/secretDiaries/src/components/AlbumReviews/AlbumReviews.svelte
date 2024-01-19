<script>
    import { navigateToReview, getStarGradient } from "../../assets/js/sharedMethods.js";
    import { onMount } from 'svelte';
    import Login from "../../pages/Login/Login.svelte.js";

    onMount(async () => {
        await updateVisibleReviews();
    });

    export let albumReviews = [];
    export let showMoreReviewsCount = 10;

    let visibleReviews = [];

    $: if (albumReviews.length > 0) {
        updateVisibleReviews();
    }

    function updateVisibleReviews() {
        visibleReviews = albumReviews.slice(0, showMoreReviewsCount);
    }

    function showMoreReviews() {
        showMoreReviewsCount += 10;
        updateVisibleReviews();
    }

</script>

{#if albumReviews.length === 0}
  <p>This album has not been review yet...</p>
{:else}
    {#each visibleReviews as review}
        <div class="review-box" on:click={() => navigateToReview(review)}>
            <span class="review-artist"><b>{review.artist}:</b> {review.title}</span>
            {#each getStarGradient(review.reviews_score) as gradient, i}
                <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
            {/each}
            <span>: {review.reviews_text.length > 50 ? `${review.reviews_text.substring(0, 50)}...` : review.reviews_text}</span>
            <span class="review-by"><b>By:</b> {review.username}</span>
        </div>
    {/each}
    {#if visibleReviews.length > showMoreReviewsCount}
        <button on:click|preventDefault={showMoreReviews}>Show more reviews</button>
    {/if}
{/if}