import { pool } from '../../../mysql'; //
import { v4 as uuidv4 } from 'uuid'; // biblioteca para criar id unicos
import { sign } from 'jsonwebtoken'; // biblioteca para token de autenticação
import { Request, Response } from 'express';

class VideoRepository {
    // ***** CREATE VIDEO ***** 
    create(request: Request, response: Response){
        const { title, description, user_id } = request.body;
        pool.getConnection((err: any, connection: any) => {

            connection.query(
                'INSERT INTO videos ( video_id, user_id, title, description ) VALUES (?,?,?,?)',
                [uuidv4(), user_id, title, description ],
                (error: any, result: any, fileds: any ) => {
                    connection.release(); // para encerrar a conexão com o BD
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({ message: 'Video criado com sucesso.'});
                }
            )
        })
    }


    getVideos(request: Request, response: Response){
        const { user_id } = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, results: any, fileds: any ) => {
                    connection.release(); // para encerrar a conexão com o BD
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar os vídeos!"})
                    }
                    return response.status(200).json({message: 'Vídeos retornados com sucesso!', videos: results})
                }
            )
        })
    }
}

export { VideoRepository }