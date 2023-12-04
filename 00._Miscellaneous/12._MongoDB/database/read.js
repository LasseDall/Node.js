import db from "./connection.js";

const allAlbums = await db.albums.find().toArray();

