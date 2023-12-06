<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToAlbum } from "../../assets/js/sharedMethods.js";
    
    const urlParams = new URLSearchParams(window.location.search);

    const reviewText = urlParams.get('review_text');
    const title = urlParams.get('title');

</script>

<h1>{reviewText} {title}</h1>