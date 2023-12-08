<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToUser } from "../../assets/js/sharedMethods.js";

    onMount(() => {
        getUsers();
    });

    let searchField = '';
    let users = [];

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
                users = result.data;
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

{#each users as user}
    <div class="user-box" on:click={() => navigateToUser(user)}>
        <h3><img src="/src/assets/images/user-icon.jpg" class="user-icon" />{user.username}</h3>
    </div>
{/each}