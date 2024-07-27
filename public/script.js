document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const body = document.body;

    // Function to fetch weather data
    const getWeatherData = async (city) => {
        const response = await fetch(`/.netlify/functions/weather?city=${city}`);
        const data = await response.json();
        return data;
    };

    // Function to display weather data
    const displayWeather = (data) => {
        weatherInfo.innerHTML = `
            <h2>Current Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    };

    // Event listener for search button
    searchButton.addEventListener('click', async () => {
        const city = searchInput.value;
        const weatherData = await getWeatherData(city);
        displayWeather(weatherData);
    });

    // Event listener for theme toggle button
    toggleThemeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        toggleThemeButton.textContent = body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    // Fetch and display weather data based on user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`/.netlify/functions/weather?lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            displayWeather(data);
        });
    }
});
