<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { onMount } from 'svelte';
    import UserComponent from "../UserComponent/UserComponent.svelte";
    
    onMount(() => {
        getUsers();
    });

    let searchField = '';
    let users = [];
    let sortField = '';
    let sortOrder = '';

    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;
    let totalPages = 1;
    let totalUsers;

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            await getUsers();
        }
    };

    const handlePrevPage = async () => {
        if (currentPage > 1) {
            currentPage -= 1;
            await getUsers();
        }
    };

    const updatePagination = () => {
        totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
    };

    const getUsers = async () => {
        let fetchUrl = $BASE_URL + `/api/users?page=${currentPage}`;
        if (sortField !== '') {
            if (sortField === 'alphAsc') {
                sortField = 'username';
                sortOrder = 'ASC';
            } else if (sortField === 'alphDesc') {
                sortField = 'username';
                sortOrder = 'DESC';
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
                users = result.data.users;
                totalUsers = result.data.totalUsers;
                updatePagination();
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const handleSearch = async () => {
        try {
            const response = await fetch($BASE_URL + `/api/users?searchField=${searchField}`, {
                credentials: "include" 
            });
  
            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                users = result.data;
                totalUsers = 10;
                updatePagination();
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const handleReset = async () => {
        await getUsers();
    }

</script>

<h2 class="span-header">Users</h2>

<div class="selecter">
    <span><b>Sort by:</b></span>
    <select bind:value={sortField} on:change={getUsers}>
      <option value="" disabled hidden>Select Sorting</option>
      <option value="alphAsc">Alphabetical (Artist A-Z)</option>
      <option value="alphDesc">Alphabetical (Artist Z-A)</option>
    </select>
</div>

<form class="search-form" on:submit|preventDefault={handleSearch} on:reset|preventDefault={handleReset}>
    <span class="search-span">
        <input type="text" id="search" placeholder="search.." bind:value={searchField}/>
        <button class="search-button" type="submit">Search</button>        
        <button class="search-button" type="reset">Reset</button>
    </span>
</form>

<UserComponent {users} />

<div class="pagination">
    <button class="button" on:click={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <span>{currentPage} of {totalPages}</span>
    <button class="button" on:click={handleNextPage} disabled={currentPage === totalPages}>Next</button>
</div>