import db from "./connection.js";

db.albums.updateOne({ "title": "Animals" }, { $set:{ "newScore": 11 }});

db.albums.updateMany({}, { $set:{ "label": "EMI" }});

