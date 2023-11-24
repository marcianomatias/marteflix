import axios from "axios";


// Base da URL = https://api.themoviedb.org/3/
// URL da API  = /movie/now_playing?api_key=5c0bf3b32e536c8a27dbd59ae82e4da2&language=pt-BR
// chave da API - 5c0bf3b32e536c8a27dbd59ae82e4da2


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;