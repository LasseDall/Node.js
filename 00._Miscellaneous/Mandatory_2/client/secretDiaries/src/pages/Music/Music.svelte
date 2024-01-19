<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { onMount } from 'svelte';
    import AlbumComponent from "../../components/AlbumComponent/AlbumComponent.svelte";


    onMount(() => {
        getAlbums();
    });

    let albums = [];
    let searchField = '';
    let sortField = '';
    let sortOrder = '';

    let title;
    let artist;
    let genre;
    let year;

    let displayAlbumForm = false;

    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;
    let totalPages = 1;
    let totalAlbums;

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            await getAlbums();
        }
    }

    const handlePrevPage = async () => {
        if (currentPage > 1) {
            currentPage -= 1;
            await getAlbums();
        }
    }

    const updatePagination = () => {
        totalPages = Math.ceil(totalAlbums / ITEMS_PER_PAGE);
    }

    const getAlbums = async () => {
        let fetchUrl = $BASE_URL + `/api/albums?page=${currentPage}`;
        if (sortField !== '') {
            if (sortField === 'rateAsc') {
                sortField = 'rating';
                sortOrder = 'ASC';
            } else if (sortField === 'rateDesc') {
                sortField = 'rating';
                sortOrder = 'DESC';
            } else if (sortField === 'alphAsc') {
                sortField = 'artist';
                sortOrder = 'ASC';
            } else if (sortField === 'alphDesc') {
                sortField = 'artist';
                sortOrder = 'DESC';
            } else if (sortField === 'yearAsc') {
                sortField = 'year';
                sortOrder = 'DESC';
            } else if (sortField === 'yearDesc') {
                sortField = 'year';
                sortOrder = 'ASC';
            }

            fetchUrl = fetchUrl + `&sortOrder=${sortOrder}&sortField=${sortField}`
        }
        try {
            const response = await fetch(fetchUrl, {
                credentials: "include" 
            });
  
            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                albums = result.data.albums;
                totalAlbums = result.data.totalAlbums;
                updatePagination();
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const handleSearch = async () => {
        try {
            const response = await fetch($BASE_URL + `/api/albums?searchField=${searchField}`, {
                credentials: "include" 
            });
  
            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                albums = result.data;
                totalAlbums = 10;
                updatePagination();
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }


    const handleReset = async () => {
        await getAlbums();
    }

    const handleCreateAlbum = async () => {
        const data = {
            title,
            artist,
            genre,
            year
        }

        try {
            const response = await fetch($BASE_URL + `/api/albums`, {
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
                toastr["success"](`You've created the album ${result.data.title}`);
                getAlbums();
                displayAlbumForm = false;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }
    

</script>

<h2 class="span-header">Music</h2>

<div class="selecter">
    <span><b>Sort by:</b></span>
    <select bind:value={sortField} on:change={getAlbums}>
      <option value="" disabled hidden>Select Sorting</option>
      <option value="alphAsc">Alphabetical (Artist A-Z)</option>
      <option value="alphDesc">Alphabetical (Artist Z-A)</option>
      <option value="rateAsc">Rating (Low to high)</option>
      <option value="rateDesc">Rating (High to low)</option>
      <option value="yearAsc">Year (Newest to oldest)</option>
      <option value="yearDesc">Rating (Oldest to newest)</option>
    </select>
</div>

<form class="search-form" on:submit|preventDefault={handleSearch} on:reset|preventDefault={handleReset}>
    <span class="search-span">
        <input type="text" id="search" placeholder="search.." bind:value={searchField}/>
        <button class="search-button" type="submit">Search</button>        
        <button class="search-button" type="reset">Reset</button>
    </span>
</form>

<AlbumComponent {albums} />

<div class="pagination">
    <button class="button" on:click={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <span>{currentPage} of {totalPages}</span>
    <button class="button" on:click={handleNextPage} disabled={currentPage === totalPages}>Next</button>
</div>

<button class="button" on:click={() => displayAlbumForm = true}>Add new album</button>

{#if (displayAlbumForm)}
<form class="album-form" on:submit|preventDefault={handleCreateAlbum}>
    <div class="input">
        <label for="title">Album title:</label>
        <input type="text" id="title" bind:value={title} />
    </div>
    <div class="input">
        <label for="artist">Artist:</label>
        <input type="text" id="artist" bind:value={artist} />
    </div>
    <div class="input">
        <label for="genre">Genre:</label>
        <input type="text" id="genre" bind:value={genre} />
    </div>
    <div class="input">
        <label for="year">Year:</label>
        <input type="number" id="year" bind:value={year} min="1930" max="2024" />
    </div>
    <button class="button" type="submit">Create album</button> 
</form>
{/if}