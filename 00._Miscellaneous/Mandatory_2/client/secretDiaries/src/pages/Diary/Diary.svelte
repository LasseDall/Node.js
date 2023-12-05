<script>
    import { DIARY_NAME } from "../../stores/diaryStore.js";
    import { BASE_URL } from "../../stores/urlStore.js";
    import { onMount } from 'svelte';

    let diary = '';
    const diaryName = $DIARY_NAME;

    onMount(() => {
        getDiary();
    });

    const getDiary = async () => {

      try {
        const response = await fetch(BASE_URL + `/api/diaries/` + diaryName, {
            credentials: "include" 
        });
        
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            diary = result.data;
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }
</script>

<h1>{diaryName}'s diary!'</h1>

<p>{diary}</p>

