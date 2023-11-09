// "use strict"; // - påpeger fejl der ikke normalt påpeges - total.. ikke defineret og arguments må ikke være navnet..

// totalGlobalVariabel = "Never do this!!!";

var globalVariabel = "Also never do this!!";

// const arguments = 123;

console.log(globalVariabel);

//global scope

// Cant do - const isThisConstant;

// const isThisConstant = 123;
// isThisConstant = 456;

// CONST KAN IKKE REDEKLARERES og den skal instantieres!
// const er ikke en konstant.

// var er global, const kan ikke redeklareres, let er samme scope som const (block), men let behøver ikke instantieres og kan ændre reference.

const isThisConstant = [];
isThisConstant.push(1, 2, 3); 
console.log(isThisConstant);

const anotherConstant = {};
anotherConstant.valueChange = true;
console.log(anotherConstant);


// var kan deklareres to gange, men let kan ikke
let test2;
// let test2

var test;
var test;

function anotherScoper() {
    // function scope
}

{
    // block scope
}

{
    {
        var someVariabel = false;
        {
            var someVariabel = true;
        }
        console.log(someVariabel);
        // someVariabel ender som true, så var bløder ud af sit scope..
    }
}

// printer 6 seks gange.. Brug let!! Aldrig var! - Nedenstånde virker ikker - ved ikke hvorfor??
/*
for (var i = 0; 0 <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
*/