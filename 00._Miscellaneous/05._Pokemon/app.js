import express from "express";
import  path from "path";
import { randomIntFromInterval } from "./util/randomUtil.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(".", "public", "frontpage", "frontPage.html"));
});

app.get("/battle", (req, res) => {
    res.sendFile(path.resolve(".", "public", "battle", "battle.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(".", "public", "contact", "contact.html"));
});

let currentPokemon;

app.get("/battlepokemon", (req, res) => {
    if (!currentPokemon || currentPokemon.strength <= 0) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + randomIntFromInterval(1, 151))
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((result) => {
            const name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
            const url = result.sprites.other.home.front_default;
            const strength = randomIntFromInterval(1, 10);
            
            currentPokemon = {
                name, 
                url,
                strength
            };
            
            res.send({ data: currentPokemon })
        })
        .catch((err) => console.log(err));   
    } else {
        currentPokemon.strength--;
        res.send({ data: currentPokemon });
    }
});

const PORT = 8080

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});

