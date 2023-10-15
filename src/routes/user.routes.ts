import { Router } from "express";
import { UserRepository } from "../modules/user/repositories/UserRepository";


const userRoutes = Router();
const userRepository = new UserRepository();

// ***** ROTA DE CADASTRO DE USUÁRIO ***** 
userRoutes.post('/sign-up', (request, response) => {
    userRepository.create(request, response)
    
})

// ***** ROTA DE LOGIN DO USUÁRIO *****
userRoutes.post('/sign-in', (request, response) => {
    userRepository.login(request, response)
})

export { userRoutes };