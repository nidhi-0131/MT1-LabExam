import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.end(homePage.replace("{{%CONTENT%}}", "Hello from Home Page"))
    } else if (req.url === "/vehicles") {
        res.end("Hello from Vehicles Page")
    } else if (req.url === "/about") {
        res.end("Hello from About Page")
    } else if (req.url === "/info") {
        res.end("Hello from Info Page")
    } else {
        res.end("404 Page Not Found")
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});