const {planets} = require ('../data');

function getPlanets(req,res) {
    res.send(planets);
}

function getPlanetById(req,res) {
    const tmpId = req.params.id;
    const planet = planets.filter(({id}) => id === +tmpId);
    if (planet) {
        res.send(planet[0]);
    } else {
        res.status(400).send(`No planet with id ${id}`);
    }
};

function getPlanetByColor(req,res) {
    const tmpColor = req.params.color;
    const planet = planets.filter(({color}) => color === tmpColor);
    if (planet) {
        res.send(planet);
    } else {
        res.status(400).send(`No planet with color ${tmpColor}`);
    }
};

function getPlanetBelowSize(req,res) {
    const tmpSize = req.params.size;
    const planet = planets.filter(({size}) => size === tmpSize);
    if(planet) {
        res.send(planet);
    } else {
        res.status(400).send(`No planet with size below ${tmpSize}`);
    }
};

function postPlanet(req,res) {
    if (!req.body.name) {
        return res.status(400).send('Missing planet\'s name');
    }
    const newPlanet = {
        id: planets[planets.length - 1].id + 1,
        name: req.body.name,
        color: req.body.color
    }
    planets.push(newPlanet);
    res.send(newPlanet);
}

function putPlanet(req,res) {
    if (!req.body.name) {
        return res.status(400).send('Missing planet\'s name');
    }
    const tmpid = req.params.id;
    const planet = planets.filter(({id}) => id === tmpid);
    if (planet) {
        const idx = planets.findIndex((obj => obj.id == tmpid));
        const newPlanet = {
            id: tmpid,
            name: req.body.name,
            color: req.body.color
        }
        planets[idx] = newPlanet;
        res.send(newPlanet);
    } else {
        res.status(400).send(`No planet with id ${id}`);
    }
}

function deletePlanet(req,res) {
    const tmpid = req.params.id;
    const planet = planets.filter(({id}) => id === +tmpid);
    if (planet) {
        const idx = planets.findIndex((obj => obj.id == tmpid));
        planets.splice(idx, 1);
        res.send(`Planet with id ${tmpid} is deleted`);
    } else {
        res.send(`Planet with id ${tmpid} doesn't exist`);
    }
}

module.exports = {
    getPlanets,
    getPlanetById,
    getPlanetByColor,
    getPlanetBelowSize,
    postPlanet,
    putPlanet,
    deletePlanet
}