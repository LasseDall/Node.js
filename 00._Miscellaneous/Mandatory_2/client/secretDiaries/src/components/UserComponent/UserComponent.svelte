<script>
    import { navigateToUser } from "../../assets/js/sharedMethods.js";
    import { onMount } from 'svelte';

    onMount(async () => {
        await updateVisibleUsers();
    });

    export let users = [];
    export let showMoreUsersCount = 10;

    let visibleUsers = [];

    $: if (users.length > 0) {
        updateVisibleUsers();
    }

    const updateVisibleUsers = () => {
        visibleUsers = users.slice(0, showMoreUsersCount);
    }

    const showMoreUsers = () => {
        showMoreUsersCount += 10;
        updateVisibleUsers();
    }
</script>

{#if users.length === 0}
  <p>No users found...</p>
{:else}
    {#each visibleUsers as user}
        <div class="user-box" on:click={() => navigateToUser(user)}>
            <img src="/src/assets/images/user-icon.jpg" class="user-icon" /><h3>{user.username}</h3>
            <span class="followers">Followers: <b>{user.followCount}</b></span>
        </div>
    {/each}
    {#if users.length > showMoreUsersCount}
        <button class="button" on:click|preventDefault={showMoreUsers}>Show more users</button>
    {/if}
{/if}