function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

// parametre behøver ikke defineres i funktioner
// funktion() udskriver return funktion uden parantes udskriver reference
// Du kan kalde funktion før den deklareres

console.log(getRandomInt());

// Anonym funktion - funktion uden navn
const getRandomIntAnonymous = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

// Arrow function - bedst at bruge
const getRandomIntArrowWithoutReturn = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

function genericActionPerformer(genericAction, name) {
    return genericAction(name);
}

// jump er en callback function
const jump = (name) => `${name} is jumping`;

function run(name) {
    return `${name} is running`;
} 

console.log(genericActionPerformer(jump, "Lasse"));
console.log(genericActionPerformer(run, "Jonathan"));
console.log(genericActionPerformer((name) => `${name} is sleeping`, "Daniel"));
