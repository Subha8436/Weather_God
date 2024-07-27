document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const body = document.body;

    // Dark mode toggle
    toggleThemeButton.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            toggleThemeButton.textContent = 'Switch to Light Mode';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            toggleThemeButton.textContent = 'Switch to Dark Mode';
        }
    });

    // Search button click event
    searchButton.addEventListener('click', () => {
        const location = searchInput.value;
        if (location) {
            fetchCurrentWeather(location);
            fetchWeatherForecast(location);
        }
    });

    // Fetch current weather
    function fetchCurrentWeather(location) {
        fetch(`/.netlify/functions/weather?q=${location}`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                weatherInfo.textContent = 'Error fetching weather data. Please try again.';
            });
    }

    // Fetch weather forecast
    function fetchWeatherForecast(location) {
        fetch(`/.netlify/functions/weather?q=${location}`)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                forecastInfo.textContent = 'Error fetching weather forecast. Please try again.';
            });
    }

    // Display current weather
    function displayWeather(data) {
        if (data.cod === '404') {
            weatherInfo.textContent = 'Location not found. Please try again.';
        } else {
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            weatherInfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon"> ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Pressure: ${data.main.pressure} hPa</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            `;
        }
    }

    // Display weather forecast
    function displayForecast(data) {
        if (data.cod === '404') {
            forecastInfo.textContent = 'Location not found. Please try again.';
        } else {
            let forecastHTML = '<h3>5-Day Forecast:</h3>';
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                forecastHTML += `
                    <div class="forecast-day">
                        <p>${date.toDateString()}</p>
                        <p><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather icon"> ${item.weather[0].description}</p>
                        <p>Temperature: ${item.main.temp}°C</p>
                    </div>
                `;
            });
            forecastInfo.innerHTML = forecastHTML;
        }
    }
});
