import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import groupSvg from "./img/group.svg";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".s-t-npt");
const loadMore = document.querySelector(".load-more");
let currentPage = 1;
let currentQuery = "";

inputEl.addEventListener("click", () => {
    inputEl.style.borderColor = "#4E75FF";
    inputEl.style.color = "#2E2F42";
});

formEl.addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = inputEl.value.trim();

    if (!query) {
        iziToast.show({
            message: 'Please enter a search query.',
            messageColor: '#ffffff',
            backgroundColor: '#EF4040',
            iconColor: '#ffffff',
            position: 'topRight',
            progressBarColor: '#B51B1B',
            iconUrl: groupSvg
        });
        return;
    }

    if (query !== currentQuery) {
        currentPage = 1;
        currentQuery = query;
        clearGallery();
    }
    
    hideLoadMoreButton();
    showLoader();
    await fetchImages();
    hideLoader();
});

loadMore.addEventListener("click", async () => {
    currentPage++;
    showLoader();
    await fetchImages();
    hideLoader();
});

async function fetchImages() {
    try {
        const { hits, totalHits } = await getImagesByQuery(currentQuery, currentPage);
        
        if (hits.length === 0) {
            iziToast.show({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageColor: '#ffffff',
                backgroundColor: '#EF4040',
                iconColor: '#ffffff',
                position: 'topRight',
                progressBarColor: '#B51B1B',
                maxWidth: '432px',
                iconUrl: groupSvg
            });
            return;
        }
        
        createGallery(hits);
        
        if (currentPage * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "#ffffff",
                backgroundColor: "#EF4040",
                iconColor: "#ffffff",
                position: "topRight",
                progressBarColor: "#B51B1B",
                maxWidth: "432px",
                iconUrl: groupSvg
            });
        } else {
            showLoadMoreButton();
            smoothScroll();
        }
    } catch (error) {
        iziToast.show({
            message: 'An error occurred while fetching images. Please try again later.',
            messageColor: '#ffffff',
            backgroundColor: '#EF4040',
            iconColor: '#ffffff',
            position: 'topRight',
            progressBarColor: '#B51B1B',
            iconUrl: groupSvg
        });
    }
}

function smoothScroll() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    if (galleryItems.length > 0) {
        const cardHeight = galleryItems[0].getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
    }
}
