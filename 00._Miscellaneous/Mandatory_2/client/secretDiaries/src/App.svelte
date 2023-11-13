<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import PrivateRoute from "../PrivateRoute.svelte";
  import Login from "./pages/Login/Login.svelte";
  import { user } from "./stores/userStore.js";
  import { LOGIN_URL } from "./stores/urlStore.js";
  import Diary from "./pages/Diary/Diary.svelte";
  import { DIARY_NAME } from "./stores/diaryStore.js";

  async function handleLogout() {
		$user = null;
      
    try {
        const response = await fetch(LOGIN_URL + "/api/auth/logout");
  
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
    {#if $user}
        <Link to="/" on:click={handleLogout}>Logout</Link>
    {:else}
        <Link to="/login">Login</Link>
    {/if}
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
  <PrivateRoute path="/diaries/mette" let:location><Diary /></PrivateRoute>
  <PrivateRoute path="/diaries/lars" let:location><Diary /></PrivateRoute>
</div>
</Router>