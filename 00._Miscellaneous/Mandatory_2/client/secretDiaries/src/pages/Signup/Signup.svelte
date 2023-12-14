<script>
    import { BASE_URL } from "../../stores/urlStore.js";  
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    let username;
    let password;
    let firstName;
    let lastName;
    let email;

    const handleSignup = async () => {
        const data = {
            username,
            password,
            firstName,
            lastName,
            email
        };

        try {
            const response = await fetch(BASE_URL + `/auth/users`, {
                method: "POST",
                credentials: "include",
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
                toastr["success"](`You are now signed up as ${result.data.username}`);
                sendEmail();
                navigate("/login");
            }
        } catch (error) {
            toastr["error"](error.message);
        }
    }

    const sendEmail = async () => {
      const data = {
        name: firstName,
        email
      };

      try {
        const response = await fetch(BASE_URL + "/email/sendemail", {
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
            toastr["success"]("A welcome email was send to you!");
        }
      } catch (error) {
        toastr["error"](error.message);
      }
    }
</script>

<h1>Signup</h1>
  
<form on:submit|preventDefault={handleSignup}>
    <div class="input">
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" bind:value={firstName} />
    </div>
    <div class="input">
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" bind:value={lastName} />
    </div>
    <div class="input">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} />
    </div>
    <div class="input">
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />
    </div>

    <div class="input">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />
    </div>

    <button type="submit">Signup</button> 
</form>