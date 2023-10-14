import express from 'express';
const app = express();

// localhost:4000

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Você acessou o servidor');

})

app.get('/param', (request, response) => {
    response.json({name: 'Ronaldo', age: 45});
})

app.get('/users', (request, response) => {
    response.json([{name: 'Ronaldo', age: 45}, {name: 'Gui', age: 12}, {name: 'Enzo', age: 10}, 
                   {name: 'Helena', age: 7}]);
})

app.post('/userData/:id', (request, response) => {
    console.log(request.body)
    console.log(request.params)
    console.log(request.query)
    console.log(request.headers)
    response.status(200).json({ success: true})
})



app.listen(4000);