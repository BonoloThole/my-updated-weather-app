function getForecast(city) {
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            alert("Unable to retrieve forecast. Please try again.");
        });
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ""; // Clear previous forecast

    data.daily.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');

        const iconUrl = day.condition.icon_url;
        const description = day.condition.description;
        const temp = day.temperature.day;
        const windSpeed = day.wind.speed;

        dayElement.innerHTML = `
            <img src="${iconUrl}" alt="Weather Icon">
            <p>${description}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        forecastContainer.appendChild(dayElement);
    });
}
