const axios = require('axios');

exports.handler = async (event) => {
  const apiKey = process.env.0abedba42881be4104bab90a6388420e;
  const city = event.queryStringParameters.city || '';
  const lat = event.queryStringParameters.lat || '';
  const lon = event.queryStringParameters.lon || '';

  try {
    let url = '';
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
