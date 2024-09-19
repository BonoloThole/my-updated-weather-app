function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function displayForecast(dailyForecast) {
  for (let i = 0; i < 5; i++) {
    let day = dailyForecast[i];
    document.getElementById(`date-${i + 1}`).textContent = formatDay(
      day.time * 1000
    );
    document.getElementById(`temp-${i + 1}`).textContent = Math.round(
      day.temperature.max
    );
    document
      .getElementById(`day-${i + 1}`)
      .querySelector(".forecast-icon").textContent = getWeatherIcon(
      day.condition
    );
  }
}

function getForecast(city) {
  let apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    displayForecast(response.data.daily);
  });
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "76b110f3c34fcb40ft0eb8e332a5of0a";
  let currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric;
  axios(apiUrl).then(displayForecast);

  axios.get(currentWeatherUrl).then(displayTemperature);
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
  const date = new Date(timestamp);
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
}

function getWeatherIcon(condition) {
  const icons = {
    Clear: "☀️",
    Rain: "🌧️",
    Clouds: "☁️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
  };
  return icons[condition] || "🌈";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
