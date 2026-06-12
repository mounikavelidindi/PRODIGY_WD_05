const API_KEY = "816c68bbed75b9df95d2970b35dd82b3"; 
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const cityInput = document.getElementById('cityInput');
const weatherBox = document.getElementById('weatherBox');

// City name tho search
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city) getWeatherByCity(city);
});

// Current location tho
locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(
        position => getWeatherByCoords(position.coords.lat, position.coords.lon),
        () => alert("Location access denied")
    );
});

async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetchWeather(url);
}

async function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetchWeather(url);
}

async function fetchWeather(url) {
    weatherBox.innerHTML = "<p>Loading...</p>";
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if(data.cod === '404') {
            weatherBox.innerHTML = "<p>City not found 😢</p>";
            return;
        }

        weatherBox.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <div class="desc">${data.weather[0].description}</div>
            <div class="details">
                <div>💧 Humidity<br>${data.main.humidity}%</div>
                <div>💨 Wind<br>${data.wind.speed} m/s</div>
            </div>
        `;
    } catch(error) {
        weatherBox.innerHTML = "<p>Error fetching data</p>";
    }
}