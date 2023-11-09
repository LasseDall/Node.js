<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import CoffeeFacts from "./pages/CoffeeFacts/CoffeeFacts.svelte";
  import CoffeeOverview from "./pages/CoffeeOverview/CoffeeOverview.svelte";
  import RegisterCoffeeLover from "./pages/RegisterCoffeeLover/RegisterCoffeeLover.svelte";
  import WhoDatCoffeeLover from "./pages/WhoDatCoffeeLover/WhoDatCoffeeLover.svelte";
  import RegisterCoffeeLoverSSR from "./pages/RegisterCoffeeLoverSSR/RegisterCoffeeLoverSSR.svelte";
  import WhoDatCoffeeLoverSSR from "./pages/WhoDatCoffeeLoverSSR/WhoDatCoffeeLoverSSR.svelte"
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/coffee-overview">Coffee overview</Link>
    <Link to="/coffee-facts">Coffee facts</Link>
    <Link to="/register-coffee-lover">Register coffee lover</Link>
    <Link to="/who-dat-coffee-lover">WhoDatCofeeLover</Link>
    <Link to="/register-coffee-lover-ssr">Register coffee lover</Link>
    <Link to="/who-dat-coffee-lover-ssr">WhoDatCofeeLover</Link>
  </nav>

  <div>
    <Route path="/" component={Home}></Route>
    <Route path="/coffee-overview"><CoffeeOverview /></Route>
    <Route path="/coffee-facts"><CoffeeFacts /></Route>
    <Route path="/register-coffee-lover"><RegisterCoffeeLover /></Route>
    <Route path="/who-dat-coffee-lover"><WhoDatCoffeeLover /></Route>
    <Route path="/register-coffee-lover-ssr"><RegisterCoffeeLoverSSR /></Route>
    <Route path="/who-dat-coffee-lover-ssr"><WhoDatCoffeeLoverSSR /></Route>
    
  </div>
</Router>
