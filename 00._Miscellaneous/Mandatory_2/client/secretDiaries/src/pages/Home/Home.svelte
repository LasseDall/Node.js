<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { currentUserId, currentUserUsername } from "../../stores/userStore.js";
    import { onMount } from 'svelte';
    import AlbumComponent from "../AlbumComponent/AlbumComponent.svelte";
    import ReviewedAlbums from "../ReviewedAlbums/ReviewedAlbums.svelte";
    import FollowedUsers from "../UserComponent/UserComponent.svelte";


    const currentUser = $currentUserId;

    let usersLikedAlbums = [];
    let usersReviews = [];
    let usersFollowedUsers = [];

    onMount(async () => {
        await getCurrentUsersFollowedUsers();
        await getCurrentUsersLikedAlbums();
        await getCurrentUsersReviews();
    });

    const getCurrentUsersLikedAlbums = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/follow-albums/${currentUser}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                usersLikedAlbums = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getCurrentUsersReviews = async () => {
        try {
            const response = await fetch(BASE_URL + `/api/album-reviews/users/${currentUser}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                toastr["error"](result.data);
            } else {
                const result = await response.json();
                usersReviews = result.data;
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const getCurrentUsersFollowedUsers = async () => {
      try {
        const response = await fetch(BASE_URL + `/api/follow-users/${currentUser}`, {
          credentials: 'include'
        });
  
        if (!response.ok) {
          const result = await response.json();
          toastr["error"](result.data);
        } else {
          const result = await response.json();
          usersFollowedUsers = result.data;
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    };



</script>
<h1>{$currentUserUsername}</h1>

<h2>Your liked albums:</h2>
<AlbumComponent albums={usersLikedAlbums} />


<h2>Users you are following:</h2>
<FollowedUsers users={usersFollowedUsers} />

<h2>Your reviews:</h2>
<ReviewedAlbums {usersReviews} />



