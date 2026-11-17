import http from 'http';
import fs from 'fs';

const homePage = fs.readFileSync('./index.html', 'utf-8');

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(homePage.replace("{{%CONTENT%}}", "Hello from Home Page"))
    } else if (req.url === "/vehicles") {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify([
            {
                _id: 1,
                Vehicle_Name: "Swift",
                Company: "Maruti Suzuki",
                Price: 700000
            },
            {
                _id: 2,
                Vehicle_Name: "Carens",
                Company: "Kia",
                Price: 1500000
            },
            {
                _id: 3,
                Vehicle_Name: "Nexon",
                Company: "Tata Motors",
                Price: 900000
            },
            {
                _id: 4,
                Vehicle_Name: "Creta",
                Company: "Hyundai",
                Price: 1100000
            },
            {
                _id: 5,
                Vehicle_Name: "Thar",
                Company: "Mahindra",
                Price: 1200000
            }
        ]));
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