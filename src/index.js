function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[dayIndex];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();

  return `${currentDay}, ${currentMonth} ${currentDate}`;
}

function formatForecastDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col" >
                <div class="forecast-day"><h6>${formatForecastDay(
                  forecastDay.dt
                )}</h6></div>
                <div>
                
                <img class="forecast-icons" src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="60"/>
                </div>                       
                  <span class="forecast-low">${Math.round(
                    forecastDay.temp.min
                  )}°</span>|
                  <span class="forecast-high">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let currentTime = new Date();

  let currentTemperatureElement = document.querySelector("#temperature");
  let highTemperatureElement = document.querySelector("#high-temp");
  let lowTemperatureElement = document.querySelector("#low-temp");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
  highTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(currentTime);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//let apiKey = "197ef3a642b76eef90e131866f74a0a0";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
//axios.get(apiUrl).then(displayWeather);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchField = document.querySelector("#search-field");
searchField.addEventListener("submit", handleSubmit);

searchCity("New York");
