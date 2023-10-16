import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepository";

const videosRoutes = Router();
const videoRepository = new VideoRepository();

// ***** ROTA DE CREATE VIDEO ***** 
videosRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response);
})

// ***** ROTA DE GET VIDEO DO USUARIO ***** 
videosRoutes.get('/get-videos', (request, response) => {
    videoRepository.getVideos(request, response);
})

// ***** ROTA DE PESQUISAR VIDEO DO USUARIO ***** 
videosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
})

export { videosRoutes };