<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToAlbum } from "../../assets/js/sharedMethods.js";

   

    onMount(() => {
        getAlbums();
    });

    let albums = [];

    const getAlbums = async () => {

        try {
            const response = await fetch(BASE_URL + `/api/albums`, {
                credentials: "include" 
            });
  
            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                albums = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

</script>

<h1>Music</h1>

{#each albums as album}
  <div class="album-box" on:click={() => navigateToAlbum(album)}>
    <h3><img src="/src/assets/images/vinyl-icon.png" class="vinyl-icon" />{album.artist}: {album.title}</h3>
    <h3>{album.genre}</h3>
    <h3>{album.rating}</h3>
  </div>
{/each}