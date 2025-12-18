const Soil = require("../pkg/soils/soilSchema");
const { chatWithAI } = require("./aiSystem");

// TODO: Use this handler on frontend
exports.createSoil = async (req, res) => {
    try {
        const soil = new Soil(req.body);
        await soil.save();

        return res.status(200).json(soil);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// TODO: Use this handler on frontend
exports.getAllSoils = async (req, res) => {
    try {
        const soils = await Soil.find();
        return res.status(200).json(soils);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// RAG
// Retrieve - Databaza
// Augment - AI izmena
// Generate - Rezultat generiran od ai context

exports.chatAboutSoils = async (req, res) => {
    try {
        if (req.auth?.role === "admin") {
            return res.status(403).json({ error: "Admins cannot use the Soil Chat!" });
        }

        const soils = await Soil.find();

        const context = soils.map(
            (soil) =>
                `Name: ${soil.name}, Type: ${soil.type}, pH: ${soil.ph}, Humus: ${soil.humus}, Location: ${soil.location}, Culture: ${soil.culture}`
        );

        const systemMessage =
            "You are an expert about soils in Macedonia. Use the following information to answer the questions:";

        const fullPrompt = `${systemMessage}\n${context}\n\nQuestion: ${req.body.prompt}`;

        const aiResponse = await chatWithAI(fullPrompt);

        return res.status(200).json(aiResponse);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.addSampleSoils = async (req, res) => {
    try {
        const sampleSoils = [
            {
                name: "Chernitsa",
                type: "Chernozem",
                ph: 6.8,
                humus: 3.5,
                texture: "clayey",
                color: "dark brown",
                location: "Pelagonia",
                seaLevel: 600,
                characteristics:
                    "Fertile soil, rich in humus, suitable for cereal crops.",
                culture: ["wheat", "barley", "sunflower"],
            },
            {
                name: "Alluvial Soil",
                type: "Alluvial",
                ph: 7.2,
                humus: 2.1,
                texture: "sandy",
                color: "light brown",
                location: "Vardar Valley",
                seaLevel: 150,
                characteristics: "Good drainage, suitable for orchards and vegetables.",
                culture: ["apples", "peppers", "tomatoes"],
            },
            {
                name: "Rendzina",
                type: "Rendzina",
                ph: 7.5,
                humus: 4.0,
                texture: "clay-sandy",
                color: "gray",
                location: "Ohrid–Prespa Region",
                seaLevel: 900,
                characteristics: "Carbonate soil, rich in minerals.",
                culture: ["grapes", "corn"],
            },
            {
                name: "Mountain Soil",
                type: "Mountain",
                ph: 5.8,
                humus: 2.8,
                texture: "rocky",
                color: "dark gray",
                location: "Šar Mountain",
                seaLevel: 1500,
                characteristics: "Poorly developed, suitable for pastures.",
                culture: ["clover", "meadow grass"],
            },
            {
                name: "Clay Soil",
                type: "Clay",
                ph: 6.2,
                humus: 2.5,
                texture: "clayey",
                color: "reddish",
                location: "Tikveš Region",
                seaLevel: 200,
                characteristics: "Good for vineyards and gardening.",
                culture: ["grapes", "cucumbers"],
            },
            {
                name: "Sandy Soil",
                type: "Sandy",
                ph: 7.0,
                humus: 1.2,
                texture: "sandy",
                color: "yellow",
                location: "Gevgelija",
                seaLevel: 80,
                characteristics: "Easy to work, warms up quickly.",
                culture: ["watermelon", "melon"],
            },
            {
                name: "Solonchak",
                type: "Solonchak",
                ph: 8.5,
                humus: 0.8,
                texture: "clay-sandy",
                color: "white",
                location: "Kumanovo",
                seaLevel: 120,
                characteristics: "High salt content.",
                culture: ["barley", "corn"],
            },
            {
                name: "Rocky Soil",
                type: "Rocky",
                ph: 6.0,
                humus: 1.0,
                texture: "rocky",
                color: "gray",
                location: "Kruševo",
                seaLevel: 1100,
                characteristics: "Low fertility, suitable for forests.",
                culture: ["pine", "beech"],
            },
            {
                name: "Loam",
                type: "Loam",
                ph: 6.5,
                humus: 2.0,
                texture: "loamy",
                color: "light brown",
                location: "Strumica",
                seaLevel: 250,
                characteristics: "Good for vegetables and fruits.",
                culture: ["tomatoes", "strawberries"],
            },
            {
                name: "Mountain Chernozem",
                type: "Chernozem",
                ph: 6.9,
                humus: 3.8,
                texture: "clayey",
                color: "dark brown",
                location: "Mavrovo",
                seaLevel: 1400,
                characteristics: "Fertile, rich in organic matter.",
                culture: ["wheat", "potatoes"],
            },
        ];

        const inserted = await Soil.insertMany(sampleSoils);
        return res.status(201).json({
            message: "Soils added",
            data: inserted,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};