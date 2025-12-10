const express = require("express");
const cors = require("cors");
const {expressjwt: jwt} = require("express-jwt");

require("dotenv").config();
const db = require("./pkg/db");
const { login, signup } = require("./handlers/authHandler");
db.init();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    jwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    }).unless({
        path:["/api/auth/login", "/api/auth/signup", "/api/test", "/api/echo"],
    })
);

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Server is running",
        timestamp: new Date(),
        session: 1,
    });
});

// Echo route
app.post("/api/echo", (req, res) => {
    res.json({
        message: "Message received!",
        data: req.body,
        timestamp: new Date(),
    });
});

// Authentication
app.post("/api/auth/login", login);
app.post("/api/auth/signup", signup);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started: ", err.message);
    }

    console.log(`Server started at port ${PORT}`);
});