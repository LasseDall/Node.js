// Når der kun står navn, så og ikke ./ eller .js mv. så leder den efter dependencies
// import
const express = require("express");
// instantieret fordi det er en funktion
const app = express();

// const app = require("express")();

app.use(express.json());

app.get("/", (req, res) => {
    res.send( { data: "This is the first request handler" } );
});

app.get("/dog", (req, res) => {
    res.send({ data: "woof" });
});

app.get("/dog/:id", (req, res) => {
    req.params.id
    res.send({ dog: "Meow" });
});

app.get("/cat", (req, res) => {
    console.log(req.query)
    res.send({ data: req.query })
});

let balance = 100;
app.get("/wallet/:withdrawalAmount", (req, res) => {

    const withdrawalAmount = req.params.withdrawalAmount;

    if (balance < 0) {
        res.send({ message: "Du har ikke flere penge" });
    } else if (balance < withdrawalAmount) {
        res.send({ message: `Du har ikke ${withdrawalAmount} kroner på din konto` });
    } else {    
        res.send({ message: `Du har hævet ${withdrawalAmount} kroner.` });
        balance = balance - req.params.withdrawalAmount;
    }
});

app.post("/giveMeTheBody", (req, res) => {
    console.log(req.body)
    res.send({ data: req.body })
})

// Altid i bunden!
app.listen(8080);



