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

app.post('/vehicles', (req, res) => {
    const newVehicle = req.body;
    const requiredFields = [
        "id",
        "vehicleName",
        "vehicleNumber",
        "type",
        "price"
    ];
    if (
        !newVehicle ||
        typeof newVehicle !== "object" ||
        Array.isArray(newVehicle) ||
        requiredFields.some(field =>
            newVehicle[field] === undefined ||
            newVehicle[field] === null ||
            newVehicle[field] === ""
        )
    ) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    if (typeof newVehicle.price !== "number" || newVehicle.price <= 0) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }
    if (vehicles.some(v => v.id === newVehicle.id)) {
        return res.status(400).json({
            message: "Vehicle ID already exists"
        });
    }
    vehicles.push(newVehicle);
    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle
    });
});

app.delete('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }
    const deletedVehicle = vehicles.splice(index, 1);
    res.status(200).json({
        message: "Vehicle deleted successfully",
        vehicle: deletedVehicle[0]
    });
});

app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});