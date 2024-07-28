document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('search-input').value;
    const response = await fetch(`/.netlify/functions/weather?city=${city}`);
    const data = await response.json();

    if (response.ok) {
        displayWeather(data);
    } else {
        console.error(data.error);
    }
});

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'dark_mode_icon.png';
    } else {
        themeIcon.src = 'light_mode_icon.png';
    }
});

// Add logic to fetch user's location and display weather info
window.onload = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`/.netlify/functions/weather?lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            if (response.ok) {
                displayWeather(data);
            } else {
                console.error(data.error);
            }
        });
    }
};
