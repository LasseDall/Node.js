import express from "express";
import { randomIntFromInterval } from "./util/randomUtil.js";
import { frontpagePage, battlePage, contactPage } from "./util/preparePage.js";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); //for at kunnne bruge forms? Extended true vil parse nestede formdata?

app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/battle", (req, res) => {
    res.send(battlePage);
});

app.get("/contact", (req, res) => {
    console.log(req.body);
    res.send(contactPage);
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

app.post("/contact", (req, res) => {
    res.send({ data: "Thanks for contacting us!" });
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});

