const {planets} = require ('./models/data');
const express = require('express');
const cors = require('cors');
const path = require('path');
const planetRouter = require('./routes/planet.router');
const app = express();
const PORT = 3000;

const jsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express'); 
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Planets api',
            description: 'Planets api',
            contact: {
                name: 'Lynoma.github.io'
            },
            servers: ['https://localhost:3000']
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = jsdoc(swaggerOptions);
app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDocs));

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use((req, res, next) => {
    const datenow = Date.now();
    next();
    const dateafter = Date.now();
    const delta = dateafter - datenow;
    console.log(`Response time ${delta}ms`);
});

app.get('/', (req, res) => {
    res.send('Welcome to my web server');
}); 

app.get('/messages', (req, res) => {
    res.send('<h1>Messages</h1><ul><li>Hello 1</li><li>Hello 2</li></ul>');
});

app.use('/planets', planetRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
