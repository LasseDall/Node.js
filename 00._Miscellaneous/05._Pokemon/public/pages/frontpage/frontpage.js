function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomPokemonId = randomIntFromInterval(1, 151);

function escapeHTML(string) {
    if (!string) return "";

    return string.replaceAll(`&`, "&amp;")
        .replaceAll(`>`, "&gt;")
        .replaceAll(`<`, "&lt;")
        .replaceAll(`"`, "&quot;")
        .replaceAll(`/`, "&#039;");
}

fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonId)
.then((response) => {
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
})
.then((result) => {
    const nameHeader = document.getElementById("pokemon-name");
    nameHeader.innerText = result.name.charAt(0).toUpperCase() + result.name.slice(1);
    const imageWrapperDiv = document.getElementById("image-wrapper");
    imageWrapperDiv.innerHTML = `<img src="${result.sprites.other.home.front_default}"/>`
})
.catch((err) => {
    console.log(err.message);
});
