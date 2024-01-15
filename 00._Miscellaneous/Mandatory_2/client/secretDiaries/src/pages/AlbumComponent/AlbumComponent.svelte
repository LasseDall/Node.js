<script>
    import { navigateToAlbum, getStarGradient } from "../../assets/js/sharedMethods.js";
    import { onMount } from 'svelte';

    onMount(async () => {
        await updateVisibleAlbums();
    });

    export let albums = [];
    export let showMoreAlbumsCount = 10;

    let visibleAlbums = [];

    $: if (albums.length > 0) {
        updateVisibleAlbums();
    }

    function updateVisibleAlbums() {
        visibleAlbums = albums.slice(0, showMoreAlbumsCount);
    }

    function showMoreAlbums() {
        showMoreAlbumsCount += 10;
        updateVisibleAlbums();
    }
</script>

{#if albums.length === 0}
  <p>No albums found...</p>
{:else}
  {#each visibleAlbums as album}
    <div class="album-box" on:click={() => navigateToAlbum(album)}>
      <h3><img src="/src/assets/images/vinyl-icon.png" class="vinyl-icon" />{album.artist}: {album.title}</h3>
      <h3>{album.genre}</h3>
      <span>{parseFloat(album.rating).toFixed(1)}</span>
      {#each getStarGradient(album.rating) as gradient, i}
        <span class="rating-star" style="--star-gradient: {gradient}">&#9733;</span>
      {/each}
    </div>
  {/each}
  {#if albums.length > showMoreAlbumsCount}
    <button class="button" on:click|preventDefault={showMoreAlbums}>Show more albums</button>
  {/if}
{/if}