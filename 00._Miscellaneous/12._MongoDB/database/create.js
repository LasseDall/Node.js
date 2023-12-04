import db from "./connection.js";

await db.albums.insertOne({ title: "The Wall" });

