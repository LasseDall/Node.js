<script>
    import { LOGIN_URL } from "../../store/urlStore.js";  
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/userStore.js";

	const navigate = useNavigate();

    let username = '';
    let password = '';
  
    const handleLogin = async () => {
      const data = {
        username,
        password
      };
  
      try {
        const response = await fetch(LOGIN_URL + "/api/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
            const result = await response.json();
            console.log(result.data);
        } else {
            const result = await response.json();
            toastr["success"](result.data);
            user.set(username);
            navigate("/");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  </script>
  
  <h1>Login</h1>
  
  <form on:submit|preventDefault={handleLogin}>
    <label for="username">Brugernavn:</label>
    <input type="text" id="username" bind:value={username} />
  
    <label for="password">Adgangskode:</label>
    <input type="password" id="password" bind:value={password} />
  
    <button type="submit">Log ind</button>
  </form>
  