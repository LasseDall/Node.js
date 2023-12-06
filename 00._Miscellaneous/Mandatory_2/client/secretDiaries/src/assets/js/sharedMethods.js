import { navigate } from "svelte-navigator";

export function navigateToAlbum(album) {
    navigate(`/album?title=${album.title}&artist=${album.artist}&genre=${album.genre}&rating=${album.rating}&id=${album.id}`);
}

export function navigateToReview(review) {
    navigate(`/review?review_score=${review.reviews_score}&review_text=${review.reviews_text}&album_id=${review.albums_id}&title=${review.title}&artist=${review.artist}&username=${review.username}&uid=${review.users_id}`);
}

export function navigateToCreateReview(id, title, artist) {
    navigate(`/create-review?title=${title}&rartist=${artist}&aid=${id}`);
}