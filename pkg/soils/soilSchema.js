const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema({
    name: String,
    type: String,
    ph: {
        type: Number,
        min: 0,
        max: 14,
    },
    humus: Number,
    texture: String,
    color: String,
    location: String,
    seaLevel: Number,
    characteristics: String,
    culture: [
        {
            type: String
        }
    ],
    dateOfCreation: {
        type: Date,
        default: () => Date.now(),
    },
});

const Soil = mongoose.model("Soil", soilSchema);

module.exports = Soil;