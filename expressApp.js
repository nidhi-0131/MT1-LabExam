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

app.get('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }
    res.status(200).json(vehicle);
});