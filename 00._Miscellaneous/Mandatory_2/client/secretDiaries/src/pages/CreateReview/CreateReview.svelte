<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { useNavigate } from "svelte-navigator";
    import { currentUserId, reviews } from "../../stores/userStore.js";

    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);

    const currentUser = $currentUserId;
    let albumsReviewed = $reviews;
    const albumId = urlParams.get('aid');
    const title = urlParams.get('title');
    const artist = urlParams.get('artist');

    let maxStars = 5;
    let rating = 0;
    let reviewText;

    const createReview = async () => {
        const data = {
            userId: currentUser,
            albumId: albumId,
            reviewScore: rating,
            reviewText: reviewText
        }

        try {
            const response = await fetch($BASE_URL + `/api/album-reviews`, {
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
                albumsReviewed.push(albumId);
                reviews.set(albumsReviewed);
                toastr["success"](`You've reviewed ${title}!`);
                navigate(`/album?id=${albumId}`);
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    function setRating(value) {
        rating = value;
    }
</script>

<span class="span-header">{artist}: {title}</span>
<form on:submit|preventDefault={createReview}>
    <div class="input">
        <label for="stars">Score:</label>
        <div class="star-box">
        {#each Array(maxStars) as _, i}
          <span
              id="stars" class="star {i < rating ? 'active' : ''}"
              on:click={() => setRating(i + 1)}>
              &#9733;
          </span>
        {/each}
        </div>
    </div>
    <div class="input">
      <label for="reviwText">Comment:</label>  
      <textarea name="reviewText" cols="40" rows="10" placeholder="Comment" bind:value={reviewText}></textarea>
    </div>
    <button class="button" type="submit">Create review</button>
</form>
