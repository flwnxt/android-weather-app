const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const WEATHER_ICON_PREFIX_URL = 'https://openweathermap.org/img/w';
const API_KEY = '8a74ee55673426115942f18fb4c67427';
let weatherCache = [];

// const handleWeather = () => {}
async function handleWeather() {
  const search = document.querySelector('.searchBar');
  const city = document.querySelector('.citySearch').value;

  if (!city) return;

  const loader = document.querySelector('.loading');
  const weatherContainer = document.querySelector('.weather');
  const forecastContainer = document.querySelector('.forecast');
  const date = new Date().toLocaleTimeString('ro', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  document.querySelector(
    '.city',
  ).innerHTML = `Weather for ${city.toUpperCase()} at ${date}`;
  search.style.top = 0;

  if (
    weatherCache.length === 0 ||
    weatherCache[0].name.toLowerCase() !== city
  ) {
    loader.classList.add('display');
    weatherContainer.style.opacity = 0;
    forecastContainer.style.opacity = 0;

    // const weather = await getWeather(city);
    // const forecast = await getForecast(city);
    const weather = await Promise.all([getWeather(city), getForecast(city)]);
    loader.classList.remove('display');

    if (weather[0].cod != 200 || weather[0].cod != 200) {
      handleError(weather);
      return;
    }
    weatherCache = [...weather];
  }

  weatherContainer.style.opacity = 0.75;
  forecastContainer.style.opacity = 0.75;

  showWeather(weatherCache[0]);
  showForecast(weatherCache[1]);
}

async function getWeather(city) {
  const response = await fetch(
    `${WEATHER_URL}?appid=${API_KEY}&units=metric&q=${city}`,
  );
  // const data = await response.json();
  // return data;
  return await response.json();
}

async function getForecast(city) {
  const response = await fetch(
    `${FORECAST_URL}?appid=${API_KEY}&units=metric&q=${city}`,
  );
  return await response.json();
}

function showWeather(weather) {
  const weatherIcon = document.querySelector('.weatherNowIcon');
  const degrees = document.querySelector('.degrees');
  const feelsLike = document.querySelector('.feelsLike');
  const tempMin = document.querySelector('.tempMin');
  const tempMax = document.querySelector('.tempMax');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const pressure = document.querySelector('.pressure');

  weatherIcon.src = `${WEATHER_ICON_PREFIX_URL}/${weather.weather[0].icon}.png`;
  degrees.innerHTML = `${Math.round(weather.main.temp)} &#8451`;
  feelsLike.innerHTML = `Feels like ${Math.round(
    weather.main.feels_like,
  )} &#8451`;
  tempMin.innerHTML = `MIN ${Math.round(
    weather.main.temp_min,
  )} &#8451`;
  tempMax.innerHTML = `MAX ${Math.round(
    weather.main.temp_max,
  )} &#8451`;
  wind.innerHTML = `Vv ${weather.wind.speed}`;
  humidity.innerHTML = `Humidity ${weather.main.humidity}`;
  pressure.innerHTML = `ATM pressure ${weather.main.pressure}`;
}

function showForecast(forecast) {
  let table = '';
  forecast.list.forEach((hourlyForecast) => {
    const hour = hourlyForecast.dt_txt.substring(11, 16);
    const year = hourlyForecast.dt_txt.substring(0, 4);
    const month = hourlyForecast.dt_txt.substring(5, 7);
    const day = hourlyForecast.dt_txt.substring(8, 10);
    const date = new Date(Date.UTC(year, month - 1, day));
    const weekDay = date.toLocaleDateString('ro', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    table += `<div class="table-grid"><div>${weekDay} - ${hour}</div>`;
    table += `<div><img src="${WEATHER_ICON_PREFIX_URL}/${hourlyForecast.weather[0].icon}.png" /></div>`;
    table += `<div>${hourlyForecast.weather[0].description}</div>`;
    table += `<div>${Math.round(hourlyForecast.main.temp)} &#8451</div>`;
    table += `<div class="mobile">wind ${hourlyForecast.wind.speed}</div></div>`;
  });
  document.querySelector('.forecastTable').innerHTML = table;
}

function handleError(weather) {
  const error = weather.filter((data) => data.cod != 200);
  alert(`Something went wrong: ${error[0].cod} - ${error[0].message}`);
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    handleWeather();
  }
}

document.addEventListener('keydown', handleEnter);
