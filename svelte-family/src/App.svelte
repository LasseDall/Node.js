
<script>
  import Home from "./components/Home/Home.svelte";
  import Parent from "./components/Parent/Parent.svelte";

  const parents = ["Anders", "Karoline"];
  const children = [
    {
      name: "Gustav",
      blackSheep: "medium-black-sheep"
    },
    {
      name: "Sarah",
      isGirl: true
    },
    {
      name: "Alexander",
      blackSheep: "ultra-black-sheep"
    }
  ]
</script>
<Home>
  
  <Parent name={parents[0]} children={children} />
  <Parent name={parents[1]} children={children} />
  
  <!-- {#each parents as parentName}
    <Parent name={parentName} children={children}/>
  {/each} -->
</Home>