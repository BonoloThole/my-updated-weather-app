function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function displayForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";
  forecastData.forEach(function (day, index) {
    if (index < 5) {
      const forecastHTML = `
        <div class="forecast-day">
          <h3>${formatDay(day.dt)}</h3>
          <p>
            <span class="forecast-temperature">${Math.round(
              day.main.temp
            )}°C</span>
            <span class="forecast-icon">☀️</span> <!-- Replace this with real icon -->
          </p>
          <p>Humidity: <strong>${day.main.humidity}%</strong></p>
          <p>Wind: <strong>${day.wind.speed} km/h</strong></p>
        </div>`;
      forecastContainer.innerHTML += forecastHTML;
    }
  });
}

function getForecast(city) {
  let apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      console.log(response.data);
      let forecast = response.data.daily;
      displayForecast(forecast);
    })
    .catch(function (error) {
      console.log("Error fetching forecast data", error);
    });
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  getForecast(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
