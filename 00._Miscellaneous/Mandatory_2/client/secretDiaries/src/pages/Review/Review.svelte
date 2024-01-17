<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { onMount } from 'svelte';
    import { getStarGradient } from "../../assets/js/sharedMethods.js";
    
    onMount(() => {
        getReview();
    });


    const urlParams = new URLSearchParams(window.location.search);

    const albumId = urlParams.get('album_id');
    const userId = urlParams.get('uid');

    let review;

    async function getReview() {
        try {
            const response = await fetch($BASE_URL + `/api/album-reviews/${userId}/${albumId}`, {
            credentials: "include" 
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                review = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }
    


</script>

{#if (review)}
    <h1 class="header">{review[0].artist}: {review[0].title}</h1>
    <h3>{review[0].reviews_text}</h3>
    {#each getStarGradient(review[0].reviews_score) as gradient, i}
        <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
    <h4>By: {review[0].username}</h4>
{/if}
