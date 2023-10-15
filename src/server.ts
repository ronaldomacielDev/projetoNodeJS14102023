import express from 'express';
import { pool } from './mysql'; //
import { v4 as uuidv4 } from 'uuid'; // biblioteca para criar id unicos
import { hash } from 'bcrypt'; // biblioteca para criptografia da senha

const app = express();

app.use(express.json());

app.post('/user', (request, response) => {
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
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({ success: true});
                }
            )
        })
    })
})

app.listen(4000);