<script>
  import { Router, Link, Route } from "svelte-navigator";
  import { onMount } from 'svelte';
  import Home from "./pages/Home/Home.svelte";
  import PrivateRoute from "../PrivateRoute.svelte";
  import Login from "./pages/Login/Login.svelte";
  import { currentUserId } from "./stores/userStore.js";
  import { BASE_URL } from "./stores/urlStore.js";
  import Music from "./pages/Music/Music.svelte";
  import Users from "./pages/Users/Users.svelte";
  import Album from "./pages/Album/Album.svelte";
  import UserPage from "./pages/UserPage/UserPage.svelte";
  import Review from "./pages/Review/Review.svelte";
  import CreateReview from "./pages/CreateReview/CreateReview.svelte";
  import ChatRoom from "./pages/ChatRoom/ChatRoom.svelte";
  import Signup from "./pages/Signup/Signup.svelte";

  async function handleLogout() {
		$currentUserId = null;
      
    try {
        const response = await fetch($BASE_URL + "/auth/logout");
  
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            localStorage.clear;
            toastr["success"](result.data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  onMount(() => {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  });
</script>

<Router>
  <div class="doc-top">
  <nav class="navbar navbar-expand-lg navbar-light bg-light-grey">

    <div class="container-fluid">
      <ul id="menu" class="navbar-nav">
        <li id="home-icon">
          <Link to="/">
            <img src="/src/assets/images/Hookem_hand.svg">
          </Link>
        </li>
        <li id="home" class="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li id="music" class="nav-item">
          <Link to="/music">Music</Link>
      </li>
      <li id="users" class="nav-item">
        <Link to="/users">Users</Link>
      </li>
    <li id="chat" class="nav-item">
      <Link to="/chat-room">Chat</Link>
    </li>
    <li id="login" class="nav-item">
      {#if $currentUserId !== null}
      <Link to="/" on:click={handleLogout}>Logout</Link>
    {:else}
      <Link to="/login">Login</Link>
    {/if}      
  </li>
    </ul>
    </div>
</nav>
</div>

<div>
  <PrivateRoute path="/" let:location><Home /></PrivateRoute>
  
  <PrivateRoute path="/music" let:location><Music /></PrivateRoute>
   
  <PrivateRoute path="/users" let:location><Users /></PrivateRoute>
  
  <PrivateRoute path="/album" let:location><Album /></PrivateRoute>

  <PrivateRoute path="/review" let:location><Review /></PrivateRoute>

  <PrivateRoute path="/create-review" let:location><CreateReview /></PrivateRoute>

  <PrivateRoute path="/user-page" let:location><UserPage /></PrivateRoute>

  <PrivateRoute path="/chat-room" let:location><ChatRoom /></PrivateRoute>

  <Route path="/signup"><Signup /></Route>

  <Route path="/login"><Login /></Route>
</div>
</Router>

<footer>
  <p>Node.js project by Lasse Dall Mikkelsen</p>
  <img src="/src/assets/images/Hookem_hand.svg">
</footer>