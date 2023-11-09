const trolls = [
    { name: "troll1", trollLevel: 7 },
    { name: "troll2", trollLevel: 22 },
    { name: "troll3", trollLevel: 25 }
];

const trollsPlus5 = trolls.map( (troll) => ({
    ...troll,
    trollLevel: troll.trollLevel += 5 
}));

const trollsPlus3 = trolls.map( (troll) => ({
    name: troll.name,
    trollLevel: troll.trollLevel += 3 
}));

const trollsPlus2 = trolls.map( (troll) => {
    troll.trollLevel += 2;
    return troll;
});

const oddTrolls = trollsPlus2.filter( (troll) => {
    if (troll.trollLevel % 2 !== 0) {
     return troll;
    };
 });

const oddNumberTrolls = trolls.filter( (troll) => troll.trollLevel % 2 )




console.log(oddNumberTrolls);
