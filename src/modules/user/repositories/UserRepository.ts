import { pool } from '../../../mysql'; //
import { v4 as uuidv4 } from 'uuid'; // biblioteca para criar id unicos
import { hash, compare } from 'bcrypt'; // biblioteca para criptografia da senha
import { sign } from 'jsonwebtoken'; // biblioteca para token de autenticação
import { Request, Response } from 'express';

class UserRepository {
    // ***** CADASTRO DE USUÁRIO ***** 
    create(request: Request, response: Response){
        const { name, email, password } = request.body;
        pool.getConnection((err: any, connection: any) => {
            hash(password, 10, (err, hash) => {
                if(err) {
                    return response.status(500).json(err)
                }

                connection.query(
                    'INSERT INTO users ( user_id, name, email, password ) VALUES (?,?,?,?)',
                    [uuidv4(), name, email, hash ],
                    (error: any, result: any, fileds: any ) => {
                        connection.release(); // para encerrar a conexão com o BD
                        if (error) {
                            return response.status(400).json(error)
                        }
                        response.status(200).json({ message: 'Usuário criado com sucesso!'});
                    }
                )
            })
        })
    }
    
    // ***** LOGIN DO USUÁRIO *****
    login(request: Request, response: Response){
        const { name, email, password } = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error: any, results: any, fileds: any ) => {
                    connection.release(); // para encerrar a conexão com o BD
                    if (error) {
                        return response.status(400).json({error: "Erro na sua autenticação!"})
                    }
                    // compara se o password esta correto com o que tem no BD
                    compare(password, results[0].password, (err, result) => {
                        if (err) {
                            return response.status(400).json({err: "Erro na sua autenticação!"})
                        }

                        if(result){
                            // jsonwebtoken
                            const token = sign({
                                id: results[0].user_id, 
                                email: results[0].email
                            }, process.env.SECRET as string, {expiresIn: "1d"})
                            
                            return response.status(200).json({token: token, message: 'Autenticado com sucesso!'})
                        }
                    })
                }
            )
        })
    }

}

export { UserRepository }