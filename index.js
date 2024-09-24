function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";

    
    response.data.forecast.forEach((forecastDay) => {
        let date = new Date(forecastDay.date * 1000);
        let day = date.toLocaleString('en-US', { weekday: 'long' }); 
        let temperature = Math.round(forecastDay.temperature.maximum);
        let icon = forecastDay.condition.icon; 

        forecastHTML += `
            <div class="forecast-day">
                <div class="forecast-date">${day}</div>
                <img src="${icon}" alt="${forecastDay.condition.description}" class="forecast-icon"/>
                <div class="forecast-temperature">${temperature}°C</div>
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHTML; 
}

function fetchForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

    axios.get(forecastApiUrl).then(displayForecast); // Call the displayForecast function with the response
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;

    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
        displayTemperature(response);
        fetchForecast(city); // Fetch the forecast data after displaying temperature
    });
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = dayNames[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    // Format the date string
    return `${day}, ${hours}:${minutes}`;
}
