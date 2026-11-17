import express from 'express';

const app = express();

app.use(express.json());

const vehicles = [
    {
        id: 1,
        vehicleName: "Hyundai Creta",
        vehicleNumber: "HR26AB1234",
        type: "SUV",
        price: 1500000
    },
    {
        id: 2,
        vehicleName: "Kia Carens",
        vehicleNumber: "UP16CD5678",
        type: "MUV",
        price: 1500000
    },
    {
        id: 3,
        vehicleName: "Tata Nexon",
        vehicleNumber: "UP16EF9012",
        type: "SUV",
        price: 900000
    }
];

app.get('/vehicles', (req, res) => {
    res.status(200).json(vehicles);
});

