import axios from "axios";


const api= () => {
    axios.create({
    baseURL: process.env.SONG_API_URL
})};

export default api;