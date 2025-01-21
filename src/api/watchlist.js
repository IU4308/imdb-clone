import axios from "axios";

export default axios.create({
    baseURL: 'https://imdb-clone-backend-lemon.vercel.app'
})