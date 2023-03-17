const { write } = require('fs');
const http = require('http');
const server = http.createServer();
const PORT = 3000;
const {planets} = require('./data');
const {heroes} = require('./data')

server.on('request', (req, res) => {
    switch (req.method) {
        case 'GET':
            const urlSplits = req.url.split('/');
            switch (urlSplits[1]) {
                case '':
                    res.write('Welcome to my web server');       
                    break;
                case 'messages':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.write('<h1>Messages</h1><ul><li>Hello 1</li><li>Hello 2</li></ul>');       
                    break;
                case 'planets':
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    if (urlSplits.length == 3 && urlSplits[2].length > 0) {
                        const tmpPlanets = planets.filter(({id}) => id === +urlSplits[2]);
                        res.write(JSON.stringify(tmpPlanets));
                    } else if (urlSplits.length == 4 && urlSplits[2] === 'color') {
                        const tmpPlanets = planets.filter(({color}) => color === urlSplits[3]);
                        res.write(JSON.stringify(tmpPlanets));     
                    } else if (urlSplits.length == 4 && urlSplits[2] === 'size') {
                        const tmpPlanets = planets.filter(({size}) => size < urlSplits[3]);
                        res.write(JSON.stringify(tmpPlanets));     
                    } else if (urlSplits.length == 2) {
                        res.write(JSON.stringify(planets));     
                    } else {
                        res.statusCode = 404;
                        res.write('Not found');
                    }
                    break;
               
                default:
                    res.statusCode = 404;
                    res.write('Not found');
                    break;
            }
            break;
        case 'POST':
            switch (req.url) {
                case '/planets':
                    req.on('data', (data) => {
                        const planet = data.toString();
                        console.log('Request: ', planet);
                        planets.push(JSON.parse(planet));
                    });
                    break;
                default:
                    res.statusCode = 404;
                    write('Not found');
                    break;
            }
            break;
        default:
            res.statusCode = 501;
            write('Not implemented');
            break;
    }
    res.end();
}).on('error', (err) => {
    res.statusCode = 500;
    res.end('Server Error');
});

server.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
