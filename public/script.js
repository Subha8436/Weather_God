document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '0abedba42881be4104bab90a6388420e';
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const body = document.body;

    // Function to fetch weather data
    const getWeatherData = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    // Function to fetch forecast data
    const getForecastData = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
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

    // Function to display forecast data
    const displayForecast = (data) => {
        forecastInfo.innerHTML = '<h2>5-Day Forecast</h2>';
        data.list.forEach(item => {
            forecastInfo.innerHTML += `
                <div>
                    <p>${new Date(item.dt_txt).toLocaleString()}</p>
                    <p>Temperature: ${item.main.temp} °C</p>
                    <p>Weather: ${item.weather[0].description}</p>
                </div>
            `;
        });
    };

    // Event listener for search button
    searchButton.addEventListener('click', async () => {
        const city = searchInput.value;
        const weatherData = await getWeatherData(city);
        displayWeather(weatherData);
        const forecastData = await getForecastData(city);
        displayForecast(forecastData);
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
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        });
    }
});
