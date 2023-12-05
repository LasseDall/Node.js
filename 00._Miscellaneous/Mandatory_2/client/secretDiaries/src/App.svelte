<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import PrivateRoute from "../PrivateRoute.svelte";
  import Login from "./pages/Login/Login.svelte";
  import { currentUserId } from "./stores/userStore.js";
  import { BASE_URL } from "./stores/urlStore.js";
  import Diary from "./pages/Diary/Diary.svelte";
  import { DIARY_NAME } from "./stores/diaryStore.js";
  import Music from "./pages/Music/Music.svelte";
  import Users from "./pages/Users/Users.svelte";
  import Album from "./pages/Album/Album.svelte";
  import UserPage from "./pages/UserPage/UserPage.svelte";

  async function handleLogout() {
		$currentUserId = null;
      
    try {
        const response = await fetch(BASE_URL + "/api/auth/logout");
  
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            toastr["success"](result.data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    {#if $currentUserId}
        <Link to="/" on:click={handleLogout}>Logout</Link>
    {:else}
        <Link to="/login">Login</Link>
    {/if}
    <Link to="/music">Music</Link>
    <Link to="/users">Users</Link>
    <div class="dropdown">
        <Link to="/">Diaries</Link>
        <li class="dropdown-content">
                <div><Link to="/diaries/mette" on:click={() => DIARY_NAME.set("Mette")}>Mette</Link></div>
                <div><Link to="/diaries/lars" on:click={() => DIARY_NAME.set("Lars")}>Lars</Link></div>
        </li>
    </div>
</nav>

<div>
  <Route path="/" component={Home}></Route>
  <Route path="/login"> <Login /></Route>
  <Route path="/music"> <Music /></Route>
  <Route path="/users"> <Users /></Route>
  <Route path="/album"> <Album /></Route>
  <Route path="/user-page"> <UserPage /></Route>
  <PrivateRoute path="/diaries/mette" let:location><Diary /></PrivateRoute>
  <PrivateRoute path="/diaries/lars" let:location><Diary /></PrivateRoute>
</div>
</Router>