const input = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherDiv = document.querySelector("#weather");
const geoBtn = document.querySelector("#geo-btn");

const API_KEY = "00aaa02cae26d38f878cc3fcb9813294";

const getWeather = async (city) => {
    try {
        weatherDiv.innerHTML = "⏳ Chargement...";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Ville introuvable");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        weatherDiv.innerHTML = `${error.message}`;
    }
};

const getWeatherByCoords = async (lat, lon) => {
    try {
        weatherDiv.innerHTML = "⏳ Chargement...";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Ville introuvable");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        weatherDiv.innerHTML = "ville introuvable. Veuillez réessayer.";
    }
};
geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        weatherDiv.innerHTML = "La géolocalisation n'est pas supportée par votre navigateur.";
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        },
        () => {
            weatherDiv.innerHTML = "Impossible de récupérer votre position.";
        }
    );
});
const displayWeather = (data) => {
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>🌡️ ${data.main.temp} °C</p>
        <p>💧 Humidité : ${data.main.humidity}%</p>
        <p>💨 Vent : ${data.wind.speed} km/h</p>
    `;
};

searchBtn.addEventListener("click", () => {
    const city = input.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});