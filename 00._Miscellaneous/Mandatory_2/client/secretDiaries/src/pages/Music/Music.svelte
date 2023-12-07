<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToAlbum, getStarGradient } from "../../assets/js/sharedMethods.js";

   

    onMount(() => {
        getAlbums();
    });

    let albums = [];
    let searchField = '';

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

    const handleSearch = async () => {
        await getAlbums();
        const searchArray = searchField.split(' ');
        const matchCountMap = {};
        const sortedAlbumList = [];
        searchArray.forEach(word => {
            albums.forEach((album) => {
                if (album.title.toLowerCase().includes(word.toLowerCase()) || album.artist.toLowerCase().includes(word.toLowerCase())) {
                    matchCountMap[album.id] = (matchCountMap[album.id] || 0) + 1;
                } 
            });
        });
        
        let matchCountArray = Object.entries(matchCountMap).map(([album, count]) => ({ album, count }));

        matchCountArray = matchCountArray.sort((a, b) => b.count - a.count);

        matchCountArray.forEach((album) => {
            let albumFound;
            const albumFoundIndex = albums.findIndex(findAlbum => findAlbum.id == album.album);
            if (albumFoundIndex !== -1) {
                albumFound = albums.splice(albumFoundIndex, 1)[0];
                sortedAlbumList.push(albumFound);
            }
        });
        albums = sortedAlbumList
    }


    const handleReset = async () => {
        await getAlbums();
    }

</script>

<form class="search-form" on:submit|preventDefault={handleSearch} on:reset|preventDefault={handleReset}>
    <span class="span-header">
      Music
    </span>
    <span class="search-span">
        <input type="text" id="search" placeholder="search.." bind:value={searchField}/>
        <button type="submit">Search</button>        
        <button type="reset">Reset filters</button>
    </span>
</form>

{#each albums as album}
  <div class="album-box" on:click={() => navigateToAlbum(album)}>
    <h3><img src="/src/assets/images/vinyl-icon.png" class="vinyl-icon" />{album.artist}: {album.title}</h3>
    <h3>{album.genre}</h3>
    {#each getStarGradient(album.rating) as gradient, i}
        <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
    {/each}
  </div>
{/each}