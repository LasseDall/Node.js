import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS customers;");
    await db.exec("DROP TABLE IF EXISTS supermarkets;");
}


//Create tables (DDL)
await db.exec(`CREATE TABLE IF NOT EXISTS supermarkets (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(50) CHECK(name IN ('Netto', 'Rema 1000', 'Lidl')) NOT NULL,
    location TEXT,
    score INT,
    pant_automat BOOLEAN
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    supermarket_id INTEGER,
    FOREIGN KEY (supermarket_id) REFERENCES supermarkets (id)
);`);

//SEED the DB (DML)
if (isDeleteMode) {
    await db.run("INSERT INTO supermarkets (name) VALUES ('Netto');");
    await db.run("INSERT INTO supermarkets (name, pant_automat) VALUES ('Rema 1000', TRUE);");
    await db.run("INSERT INTO customers (name, supermarket_id) VALUES ('Daniel', 2);");
}