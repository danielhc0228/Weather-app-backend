// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = process.env.API_KEY;
// const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";

// app.get("/weather", async (req, res) => {
//     try {
//         const city = req.query.city;
//         const response = await axios.get(
//             `${BASE_URL}?city=${city}&key=${API_KEY}`
//         );
//         res.json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).send(error.response.data);
//         } else if (error.request) {
//             res.status(500).send("No response from weather API");
//         } else {
//             res.status(500).send("Error fetching weather data");
//         }
//     }
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/weather", async (req, res) => {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.API_KEY;
    try {
        let response;
        if (city) {
            response = await axios.get(
                `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`
            );
        } else if (lat && lon) {
            response = await axios.get(
                `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`
            );
        } else {
            return res.status(400).send("City or coordinates are required");
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
