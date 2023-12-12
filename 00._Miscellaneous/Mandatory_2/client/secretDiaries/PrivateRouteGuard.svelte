<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { currentUserId } from "./src/stores/userStore.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$currentUserId) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
		toastr["info"]("Login to be a part of this cool music community!");
	}
</script>

{#if $currentUserId}
	<slot />
{/if}