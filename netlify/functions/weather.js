const axios = require('axios');

exports.handler = async (event, context) => {
    const API_KEY = process.env.0abedba42881be4104bab90a6388420e;
    const city = event.queryStringParameters.city;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
