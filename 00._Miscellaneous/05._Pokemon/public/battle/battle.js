fetch("/battlepokemon")
    .then((response) => {
        if (!response.ok) {
            res.send({ error: "Fejl" });
        } else {
            return response.json();
        }
    }) 
    .then((result) => {
        const nameHeader = document.getElementById("pokemon-name");
        nameHeader.innerText = result.data.name;
        const strenghtHeader = document.getElementById("pokemon-strength");
        strenghtHeader.innerText = result.data.strength;
        const imageWrapperDiv = document.getElementById("image-wrapper");
        imageWrapperDiv.innerHTML = `<img id="pokemon-image" src="${result.data.url}"/>`
    })
    .catch((err) => console.log(err));