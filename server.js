const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const apiKey = '0abedba42881be4104bab90a6388420e'; // Replace with your OpenWeather API key

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const { q, lat, lon } = req.query;
    let url = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (q) {
        url += `&q=${q}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.get('/forecast', async (req, res) => {
    const { q, lat, lon } = req.query;
    let url = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

    if (q) {
        url += `&q=${q}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching forecast data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
      
