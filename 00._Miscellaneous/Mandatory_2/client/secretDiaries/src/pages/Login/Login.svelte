<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { useNavigate } from "svelte-navigator";
    import { currentUserId, followedUsers, likedAlbums, reviews, currentUserUsername } from "../../stores/userStore.js";

	  const navigate = useNavigate();

    let username = '';
    let password = '';

    const handleLogin = async () => {
      const data = {
        username,
        password
      }

      try {
        const response = await fetch($BASE_URL + "/auth/login", {
          method: 'POST',
          credentials: 'include',
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
            toastr["success"](`You are now logged in as ${result.data.username}`);
            currentUserId.set(result.data.id);
            currentUserUsername.set(result.data.username);
            getFollowedUsers(result.data.id);
            getLikedAlbums(result.data.id);
            getReviewedAlbums(result.data.id);
            navigate("/");
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }

    async function getLikedAlbums(userId) {
      try {
        const response = await fetch($BASE_URL + "/api/follow-albums/" + userId, {
          credentials: 'include'
        });
        
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            const likedAlbumsId = result.data.map(likedAlbum => likedAlbum.id);
            likedAlbums.set(likedAlbumsId);
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }

    async function getFollowedUsers(userId) {
      try {
        const response = await fetch($BASE_URL + "/api/follow-users/" + userId, {
          credentials: 'include'
        });
  
        if (!response.ok) {
          const result = await response.json();
          toastr["error"](result.data);
        } else {
          const result = await response.json();
          const followedUsersId = result.data.map(followedUser => followedUser.id);
          followedUsers.set(followedUsersId);
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }

    async function getReviewedAlbums(userId) {
      try {
        const response = await fetch($BASE_URL + "/api/album-reviews/users/" + userId, {
          credentials: 'include'
        });
  
        if (!response.ok) {
          const result = await response.json();
          toastr["error"](result.data);
        } else {
          const result = await response.json();
          const reviewedAlbumsId = result.data.map(reviewedAlbum => reviewedAlbum.albums_id);
          reviews.set(reviewedAlbumsId);
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }
    


</script>
  
  <h1>Login</h1>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="input">
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} />
    </div>

    <div class="input">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    <button type="submit">Login</button> 
    <button on:click={() => navigate("/signup")}>Signup</button>
  </form>
  