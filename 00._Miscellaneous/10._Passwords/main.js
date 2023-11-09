import bcrypt from "bcrypt";

const saltRounds = 14;

const plainTextPassword = "1234";

const hashedPassword = "$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu";


const compareResults = await bcrypt.compare(plainTextPassword, hashedPassword);

console.log(compareResults);

