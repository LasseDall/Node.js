import { navigate } from "svelte-navigator";

export function navigateToAlbum(album) {
    navigate(`/album?title=${album.title}&artist=${album.artist}&genre=${album.genre}&rating=${album.rating}&id=${album.id}`);
}

export function navigateToReview(review) {
    navigate(`/review?album_id=${review.albums_id}&uid=${review.users_id}`);
}

export function navigateToCreateReview(id, title, artist) {
    navigate(`/create-review?title=${title}&rartist=${artist}&aid=${id}`);
}

export function navigateToUser(user) {
    navigate(`/user-page?username=${user.username}&id=${user.id}`);
}

export function getStarGradient(starRating) {
    const roundedRating = Math.floor(starRating); 
    const decimalPart = starRating % 1;
    const percentage = decimalPart * 100;

    const gradients = Array(5).fill('');

    for (let i = 0; i < roundedRating; i++) {
        gradients[i] = `linear-gradient(90deg, #ffd700 0%, #ffd700 100%)`;
    }

    if (decimalPart !== 0) {
        gradients[roundedRating] = `linear-gradient(90deg, #ffd700 ${100 - percentage}%, #ccc ${percentage}%)`;
    }

    return gradients;
}
