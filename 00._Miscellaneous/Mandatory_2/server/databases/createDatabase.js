import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS users;");
    await db.exec("DROP TABLE IF EXISTS albums;");
    await db.exec("DROP TABLE IF EXISTS users_albums;");
    await db.exec("DROP TABLE IF EXISTS follow_users;");
    await db.exec("DROP TABLE IF EXISTS album_reviews;");
}


//Create tables (DDL)
await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title VARCHAR(50) NOT NULL,
    artist VARCHAR(50) NOT NULL,
    genre VARCHAR(50),
    year INTEGER,
    rating DOUBLE DEFAULT 0,
    review_count INTEGER DEFAULT 0
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS users_albums ( 
    users_id INTEGER NOT NULL,
    albums_id INTEGER NOT NULL
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS follow_users ( 
    users_id INTEGER NOT NULL,
    followed_users_id INTEGER NOT NULL
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS album_reviews ( 
    users_id INTEGER NOT NULL,
    albums_id INTEGER NOT NULL,
    reviews_score INTEGER NOT NULL,
    reviews_text TEXT
);`);

//SEED the DB (DML)
if (isDeleteMode) {
    await db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES ('Lasse123', '$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu', 'Lasse', 'Dall', 'lasse@dall.dk');");
    await db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES ('Brian', '$2b$14$pU04a5HEaatWExkjEbBCkuaccj5EgXzTrcO0V1MfIPktmuD0kHBcu', 'Brian', 'Larsen', 'brian@live.dk');");
    await db.run("INSERT INTO albums (title, artist, genre, year) VALUES ('The Wall', 'Pink Floyd', 'Prog Rock', 1985);");
    await db.run("INSERT INTO albums (title, artist, genre, year) VALUES ('Animals', 'Pink Floyd', 'Prog Rock', 1983);");
    await db.run("INSERT INTO users_albums (users_id, albums_id) VALUES (1, 1);");
    await db.run("INSERT INTO follow_users (users_id, followed_users_id) VALUES (1, 1);");
    await db.run("INSERT INTO follow_users (users_id, followed_users_id) VALUES (1, 2);");
    await db.run("INSERT INTO album_reviews (users_id, albums_id, reviews_score, reviews_text) VALUES (1, 2, 5, 'FED ROCK!');");
}