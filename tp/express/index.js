const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const express_handler = require('./express_handler');
const { getPlanetByColor } = require('./express_handler');

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to my web server');
}); 
app.get('/messages', (req, res) => express_handler.messages(req,res));
app.get('/planets', (req, res) => express_handler.getPlanets(req,res));
app.get('/planets/:id', (req, res) => express_handler.getPlanetById(req,res));
app.get('/planets/color/:color', (req, res) => express_handler.getPlanetByColor(req,res));
app.get('/planets/size/:size', (req, res) => express_handler.getPlanetBelowSize(req,res));
app.post('/planets', (req, res) => express_handler.postPlanet(req,res));
app.put('/planets/:id', (req, res) => {
   
});
app.delete('/planets/:id', (req, res) => express_handler.putPlanet(req,res));
app.get('/heroes', (req, res) => express_handler.deletePlanet(req,res));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})