import db from "./connection.js";

db.albums.deleteOne({ "title": "The Wall" });