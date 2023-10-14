import express from 'express';
import { pool } from './mysql';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

app.post('/user', (request, response) => {
    const { name, email, password } = request.body;
    pool.getConnection((err: any, connection: any) => {
        connection.query(
            'INSERT INTO users ( user_id, name, email, password ) VALUES (?,?,?,?)',
            [uuidv4(), name, email, password ],
            (error: any, result: any, fileds: any ) => {
                if (error) {
                    return response.status(400).json(error)
                }
                response.status(200).json({ success: true});
            }
        )
    })

})

app.listen(4000);