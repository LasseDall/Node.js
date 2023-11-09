<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import PrivateRouteGuard from "../PrivateRouteGuard.svelte";
  import Login from "./pages/Login/Login.svelte";
</script>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>

<Router>
<nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <li class="dropdown">
      <Link to="/">Diaries</Link>
      <ul class="dropdown-content">
        <div><Link to="/diaries/mette">Mette</Link></div>
        <div><Link to="/diaries/lars">Lars</Link></div>
      </ul>
    </li>
  
</nav>

<div>
  <Route path="/" component={Home}></Route>
  <Route path="/login"> <Login /></Route>
  <PrivateRouteGuard><Route path="diaries/mette" component={Home}></Route></PrivateRouteGuard>
  <PrivateRouteGuard><Route path="diaries/lars" component={Home}></Route></PrivateRouteGuard>
</div>
</Router>