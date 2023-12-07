<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { navigate } from "svelte-navigator";
    import { currentUserId } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import { navigateToUser } from "../../assets/js/sharedMethods.js";

    onMount(() => {
        getUsers();
    });

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

</script>

<h1>Users</h1>

{#each users as user}
    <div class="user-box" on:click={() => navigateToUser(user)}>
        <h3><img src="/src/assets/images/user-icon.jpg" class="user-icon" />{user.username}</h3>
    </div>
{/each}