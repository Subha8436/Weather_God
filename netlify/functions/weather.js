const axios = require('axios');

exports.handler = async (event, context) => {
    const apiKey = process.env.API_KEY; // Use environment variable for the API key
    const params = event.queryStringParameters;
    const { q, lat, lon } = params;
    let url = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (q) {
        url += `&q=${q}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request parameters' })
        };
    }

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching weather data' })
        };
    }
};
