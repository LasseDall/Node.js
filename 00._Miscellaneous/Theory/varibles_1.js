//Brug const når det er muligt
const scheduleBreakTime = "09:27";
//Kan overskrives
let consoleLogCounter = 0;


//Use comma in cosole log - pga. type coercion - måske forkert  resultat - console log er kun til udviklerbrug
console.log("Lad os pause kl.:", scheduleBreakTime + "!");
consoleLogCounter++

//3 måder at lave strings på
//Kan indeholde ''''
console.log("Første måde")
//Kan indeholde """"
console.log('Anden måde')
//Kan indeholde ''' og """""" og variabler ${variabel}
console.log(`${3 + 1} Tredje måde ${scheduleBreakTime}`)
consoleLogCounter+=3
console.log(consoleLogCounter);