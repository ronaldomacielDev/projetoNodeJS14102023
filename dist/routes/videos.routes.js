"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const VideosRepository_1 = require("../modules/videos/repositories/VideosRepository");
const login_1 = require("../middleware/login");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videoRepository = new VideosRepository_1.VideoRepository();
// ***** ROTA DE CREATE VIDEO ***** 
videosRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.create(request, response);
});
// ***** ROTA DE GET VIDEO DO USUARIO ***** 
videosRoutes.get('/get-videos', login_1.login, (request, response) => {
    videoRepository.getVideos(request, response);
});
// ***** ROTA DE PESQUISAR VIDEO DO USUARIO ***** 
videosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
