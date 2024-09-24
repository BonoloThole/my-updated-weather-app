function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;

    // Update current date
    let currentDateElement = document.querySelector("#current-date");
    currentDateElement.innerHTML = formatDate(new Date());
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";

    // Loop through the daily forecast data (assuming 5-day forecast)
    response.data.forecast.forEach((forecastDay) => {
        let date = new Date(forecastDay.date * 1000); // Convert timestamp to Date object
        let day = date.toLocaleString('en-US', { weekday: 'long' }); // Get the day name
        let temperatureMax = Math.round(forecastDay.temperature.maximum);
        let temperatureMin = Math.round(forecastDay.temperature.minimum);
        let icon = forecastDay.condition.icon; // Assuming condition includes an icon URL

        forecastHTML += `
            <div class="forecast-day">
                <div class="forecast-date">${day}</div>
                <img src="${icon}" alt="${forecastDay.condition.description}" class="forecast-icon"/>
                <div class="forecast-temperature">
                    ${temperatureMax}°C / ${temperatureMin}°C
                </div>
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHTML; // Insert forecast HTML into the forecast element
}

function fetchForecast(city) {
    let apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a"; // Updated API Key
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

    axios.get(forecastApiUrl).then(displayForecast); // Call the displayForecast function with the response
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;

    let apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a"; // Updated API Key
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
