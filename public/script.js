document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const body = document.body;

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

    searchButton.addEventListener('click', () => {
        const location = searchInput.value;
        if (location) {
            fetchCurrentWeather(location);
            fetchWeatherForecast(location);
        }
    });

    function fetchCurrentWeather(location) {
        fetch(`/weather?q=${location}`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                weatherInfo.textContent = 'Error fetching weather data. Please try again.';
            });
    }

    function fetchWeatherForecast(location) {
        fetch(`/forecast?q=${location}`)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                forecastInfo.textContent = 'Error fetching weather forecast. Please try again.';
            });
    }

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
                <p>Wind Speed: ${data.wind.speed} m/s, Direction: ${data.wind.deg}°</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            `;
        }
    }

    function displayForecast(data) {
        if (data.cod === '404') {
            forecastInfo.textContent = 'Location not found. Please try again.';
        } else {
            forecastInfo.innerHTML = '<h3>5-Day Forecast:</h3>';
            const forecastDays = data.list.filter((item, index) => index % 8 === 0);
            forecastDays.forEach(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                forecastInfo.innerHTML += `
                    <div class="forecast-day">
                        <h4>${date}</h4>
                        <p><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon"> ${day.weather[0].description}</p>
                        <p>Temperature: ${day.main.temp}°C</p>
                        <p>Humidity: ${day.main.humidity}%</p>
                    </div>
                `;
            });
        }
    }

    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`/weather?lat=${lat}&lon=${lon}`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    weatherInfo.textContent = 'Error fetching weather data. Please try again.';
                });
            fetch(`/forecast?lat=${lat}&lon=${lon}`)
                .then(response => response.json())
                .then(data => {
                    displayForecast(data);
                })
                .catch(error => {
                    forecastInfo.textContent = 'Error fetching weather forecast. Please try again.';
                });
        }, error => {
            weatherInfo.textContent = 'Unable to retrieve your location. Please search for a location manually.';
        });
    } else {
        weatherInfo.textContent = 'Geolocation is not supported by this browser. Please search for a location manually.';
    }
});
      
