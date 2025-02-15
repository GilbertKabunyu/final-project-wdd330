
document.getElementById('search-button').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('search-input').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = '<p>Loading...</p>';

    try {
        const apiKey = '44fc08398fa60be7f53fa1661c5b52aa'; // Replace with your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherResult.innerHTML = '<p>City not found. Please try again.</p>';
            return;
        }

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherResult.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
    `;
    } catch (error) {
        weatherResult.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        console.error(error);
    }
}
