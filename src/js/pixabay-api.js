import axios from "axios";

const API_KEY = "49579277-0e5c9424e57356edf9014d49e";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page, 
                per_page: 15, 
            }
        });
        return { hits: response.data.hits, totalHits: response.data.totalHits };
      } catch (error) {
        return { hits: [], totalHits: 0 };
    }
}
