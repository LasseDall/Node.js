const extinctDinosaurs = ["Raptosaurus", "Tritosaurus", "T-rex"];

function getDinosaurs() {
    return extinctDinosaurs;
}

function addDinosaur(extinctDinosaur) {
    extinctDinosaurs.push(extinctDinosaur);
}

export {
    getDinosaurs,
    addDinosaur
}

