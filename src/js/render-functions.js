import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ulGallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more");

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="152">
            </a>
                <ul class="gallery-list">
                    <li class="lks li-elem"><p class="p-el">Likes</p><p class="p-elem">${likes}</p></li>
                    <li class="vws li-elem"><p class="p-el">Views</p><p class="p-elem">${views}</p></li>
                    <li class="cmmnts li-elem"><p class="p-el">Comments</p><p class="p-elem">${comments}</p></li>
                    <li class=" li-elem"><p class="p-el">Downloads</p><p class="p-elem">${downloads}</p></li>
                </ul>
        </li>
    `).join("");

    ulGallery.insertAdjacentHTML("beforeend", markup);

    const gallerySimpleLightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
    });

    gallerySimpleLightbox.refresh();
};
export function clearGallery() {
    ulGallery.innerHTML = "";
};
export function showLoader() {
    loader.style.display = "block";
};
export function hideLoader() {
    loader.style.display = "none";
};
export function showLoadMoreButton() {
    loadMore.style.display = "flex";
 };
export function hideLoadMoreButton() { 
    loadMore.style.display = "none";
};
