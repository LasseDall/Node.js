<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { onMount } from 'svelte';
    import UserComponent from "../UserComponent/UserComponent.svelte";
    
    onMount(() => {
        getUsers();
    });

    let searchField = '';
    let users = [];

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
        try {
            const response = await fetch(BASE_URL + `/api/users`, {
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
        await getUsers();
        const foundUserArray = [];
        const foundUser = users.find(user => user.username.toLowerCase() == searchField.toLowerCase());
        if (foundUser) {
            foundUserArray.push(foundUser);
            console.log(foundUserArray)
            users = foundUserArray;
        }
    }

    const handleReset = async () => {
        await getUsers();
    }

</script>

<form class="search-form" on:submit|preventDefault={handleSearch} on:reset|preventDefault={handleReset}>
    <span class="span-header">
      User
    </span>
    <span class="search-span">
        <input type="text" id="search" placeholder="search.." bind:value={searchField}/>
        <button type="submit">Search</button>        
        <button type="reset">Reset filters</button>
    </span>
</form>

<UserComponent {users} />

<div class="pagination">
    <button on:click={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <span>{currentPage} of {totalPages}</span>
    <button on:click={handleNextPage} disabled={currentPage === totalPages}>Next</button>
</div>