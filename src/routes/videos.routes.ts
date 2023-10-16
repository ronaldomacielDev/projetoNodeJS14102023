import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepository";

const videosRoutes = Router();
const videoRepository = new VideoRepository();

// ***** ROTA DE CREATE VIDEO ***** 
videosRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response);
})

export { videosRoutes };