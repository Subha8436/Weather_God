const axios = require('axios');

exports.handler = async (event, context) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = event.queryStringParameters.city;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
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
