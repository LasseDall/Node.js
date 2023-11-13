<script>
    import { LOGIN_URL } from "../../stores/urlStore.js";  
    import { useNavigate } from "svelte-navigator";
    import { user } from "../../stores/userStore.js";

	  const navigate = useNavigate();

    let username = '';
    let password = '';

    let email = '';
    let name = '';
  
    const handleEmail = async () => {
      const data = {
        name,
        email
      };

      try {
        const response = await fetch(LOGIN_URL + "/api/email/sendemail", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            toastr["success"](result.data);
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }

    const handleLogin = async () => {
      const data = {
        username,
        password
      };
  
      try {
        const response = await fetch(LOGIN_URL + "/api/auth/login", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
            const result = await response.json();
            toastr["error"](result.data);
        } else {
            const result = await response.json();
            toastr["success"](result.data);
            user.set(username);
            navigate("/");
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    };

</script>
  
  <h1>Login</h1>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="input">
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} />
    </div>

    <div class="input">
      <label for="password">Passeword:</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    <button type="submit">Login</button>
  </form>

  <br><h2>Want to join the secret club?</h2>
  <h3>Let us send you an email, and you'll be considered as a member!</h3><br>

  <form on:submit|preventDefault={handleEmail}>
    <div class="input">
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} />
    </div>
  
    <div class="input">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <button type="submit">Send me an email!</button>
  </form>
  