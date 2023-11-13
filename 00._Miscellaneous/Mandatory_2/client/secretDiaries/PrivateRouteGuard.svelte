<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "./src/stores/userStore.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
		toastr["info"]("Login to read the secret diaries!");
	}
</script>

{#if $user}
	<slot />
{/if}