import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

async function handleSearch(searchField, albums) {
    const searchArray = searchField.split(' ');
    const matchCountMap = {};
    const sortedAlbumList = [];
    searchArray.forEach(word => {
        albums.forEach((album) => {
            if (album.title.toLowerCase().includes(word.toLowerCase()) || album.artist.toLowerCase().includes(word.toLowerCase())) {
                matchCountMap[album.id] = (matchCountMap[album.id] || 0) + 1;
            } 
        });
    });
    
    let matchCountArray = Object.entries(matchCountMap).map(([album, count]) => ({ album, count }));

    matchCountArray = matchCountArray.sort((a, b) => b.count - a.count);

    matchCountArray.forEach((album) => {
        let albumFound;
        const albumFoundIndex = albums.findIndex(findAlbum => findAlbum.id == album.album);
        if (albumFoundIndex !== -1) {
            albumFound = albums.splice(albumFoundIndex, 1)[0];
            sortedAlbumList.push(albumFound);
        }
    });
    return sortedAlbumList;
}

router.get("/api/albums", async (req, res) => {
    const ITEMS_PER_PAGE = 10; 
    const sortField = req.query.sortField || 'likeCount'; 
    const sortOrder = req.query.sortOrder || 'DESC';
    const searchField = req.query.searchField;
    const page = parseInt(req.query.page) || 1; 
    const offset = (page - 1) * ITEMS_PER_PAGE; 

    const albums = await db.all(`SELECT albums.*, COUNT(users_albums.albums_id) AS likeCount FROM albums
    LEFT JOIN users_albums ON albums.id = users_albums.albums_id
    GROUP BY albums.id ORDER BY ${sortField} ${sortOrder}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`);

    if (searchField) {
        const sortedAlbumList = await handleSearch(searchField, albums);
        res.send({ data: sortedAlbumList });
    } else {
        try {
            const allAlbums = await db.all(`SELECT *, (SELECT COUNT(*) FROM albums) as total_albums FROM albums`);
            const totalAlbums = allAlbums[0].total_albums;
            res.send({ data: { albums, ITEMS_PER_PAGE, totalAlbums } });
        } catch (error) {
            res.status(404).send({ data: "No albums found" });
        }
    }
});

router.get("/api/albums/:id", async (req, res) => {
    const albumId = req.params.id;

    if(isNaN(albumId)) {
        res.status(404).send({ data: "Id was not a number" });
    } else {
        const album = await db.get(`SELECT * FROM albums WHERE id = ?`,
                             albumId);
        if(album) {
            res.send({ data: album });
        } else {
            res.status(404).send({ data: "No album found" });
        }
    }
});



router.post("/api/albums", async (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const year = req.body.year;

    if (!title || !artist || !genre || isNaN(year)) {
        res.status(404).send({ data: "Some data is missing" });
    } else {
        await db.run(`INSERT INTO albums (title, artist, genre, year) VALUES (?, ?, ?, ?);`, 
                  [title, artist, genre, year]);
        res.send({ data: [title, artist, genre, year] });
    }
}); 


export default router;