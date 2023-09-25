import { getDinosaurs } from "./dinosaurFactory.js";

function getDinoInfo() {
    const extinctDinosaurs = getDinosaurs();
    console.log(`Der er ${extinctDinosaurs.length} dinosaurere`);
    console.table(extinctDinosaurs);
}

console.log("HEJ");

getDinoInfo();