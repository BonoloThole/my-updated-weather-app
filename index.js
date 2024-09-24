const apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a";

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("search-input").value;
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
  } else {
    alert("Please enter a city name");
  }
});

function getCurrentWeather(city) {
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCurrentWeather(data))
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Unable to retrieve data. Please try again.");
    });
}

function displayCurrentWeather(data) {
  const city = data.city;
  const temperature = data.temperature.current;
  const humidity = data.temperature.humidity;
  const windSpeed = data.wind.speed;

  document.getElementById("current-city").textContent = `${city}`;
  document.getElementById("current-temperature").textContent = `${temperature}`;
  document.getElementById("current-humidity").textContent = `${humidity}`;
  document.getElementById("current-wind").textContent = `${windSpeed}`;
}

function getForecast(city) {
  const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => displayForecast(data))
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
      alert("Unable to retrieve forecast data. Please try again.");
    });
}

function displayForecast(data) {
  for (let i = 0; i < 5; i++) {
    document.getElementById(`date-${i + 1}`).textContent = data.daily[i].date;
    document.getElementById(`temp-${i + 1}`).textContent = data.daily[i].temperature.day;
    document.getElementById(`icon-${i + 1}`).textContent = getWeatherIcon(data.daily[i].condition.description);
  }
}

function getWeatherIcon(description) {
  if (description.includes("rain")) return "🌧️";
  if (description.includes("cloud")) return "☁️";
  return "☀️";
}
