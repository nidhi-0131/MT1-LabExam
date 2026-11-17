import http from 'http';
import fs from 'fs';

const vehicles = [
    {
        id: 1,
        vehicleName: "Swift",
        vehicleNumber: "UP16AB1234",
        type: "Hatchback",
        price: 700000
    },
    {
        id: 2,
        vehicleName: "Carens",
        vehicleNumber: "UP16CD5678",
        type: "MUV",
        price: 1500000
    },
    {
        id: 3,
        vehicleName: "Nexon",
        vehicleNumber: "UP16EF9012",
        type: "SUV",
        price: 900000
    }
];

const homePage = fs.readFileSync('./home.html', 'utf-8');

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
        res.end(JSON.stringify(vehicles));
    } else if (req.method === "POST" && req.url === "/add-vehicle") {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newVehicle = JSON.parse(body);
                const requiredFields = [
                    "id",
                    "vehicleName",
                    "vehicleNumber",
                    "type",
                    "price"
                ];
                if (
                    newVehicle === null || typeof newVehicle !== "object" ||
                    Array.isArray(newVehicle) || 
                    requiredFields.some(field =>
                        newVehicle[field] === undefined ||
                        newVehicle[field] === null ||
                        newVehicle[field] === ""
                    )
                ) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });
                    return res.end(JSON.stringify({
                        message: "Missing required fields"
                    }));
                }
                vehicles.push(newVehicle);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    message: "Vehicle added successfully",
                    vehicle: newVehicle
                }));
            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    } else if (req.url === "/about") {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("Welcome to Vehicle Management Application");
    } else if (req.url === "/info") {
        fs.readFile('./public/info.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                return res.end("Internal Server Error: Unable to read file");
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end("404 Page Not Found");
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});