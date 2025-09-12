const apiKey = "7a776b6c8c5161dd4d9f1ffdea1c7e4b";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    // show weather, hide error
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity p").innerHTML =
      "Humidity: " + data.main.humidity + "%";
    document.querySelector(".windspeed p").innerHTML =
      "Wind Speed: " + data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "cloudy.svg";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "raining.svg";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "drizzle.svg";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "mist.svg";
    } else {
      weatherIcon.src = "clear.svg";
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
