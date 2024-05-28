import getWeatherData from "./apiFunctions";
import {getTime, getIcon, getDayName, getBackgroundVideo} from "./utils";

let currentCity = "london";
let currentUnit = "metric";

function getInputValue(){
    const input = document.querySelector(".search-box");
    const button = document.querySelector(".search-button");
    button.addEventListener("click", function(){
        renderWeatherInfo(input.value, currentUnit);
        renderForecast(input.value, currentUnit);
    });
    input.addEventListener("keyup", function(e){
        if(e.key === "Enter"){
            renderWeatherInfo(input.value, currentUnit);
            renderForecast(input.value, currentUnit);
        }
    });
}

const unitChange = document.querySelector(".unit__change");
unitChange.addEventListener("click", function(){
    unitChange.textContent = unitChange.textContent === "Display in °C" ? "Display in °F" : "Display in °C";
    currentUnit = currentUnit === "metric" ? "us" : "metric";
    renderWeatherInfo(currentCity, currentUnit);
    renderForecast(currentCity, currentUnit);
});

async function renderWeatherInfo(city, unit){
    if(!city){
        city = currentCity;
    }

    if(!unit){
        unit = currentUnit;
    }

    currentCity = city;
    let unitTemp;
    let unitSpeed;

    if(unit === "metric"){
        unitTemp = "°C";
        unitSpeed = "km/h";
    }else if(unit === "us"){
        unitTemp = "°F";
        unitSpeed = "mph";
    }
    const weatherData = await getWeatherData(city, unit);
    const desc = document.querySelector(".weather-info__desc");
    desc.textContent = weatherData.currentConditions.conditions;

    const desc2 = document.querySelector(".weather-info__desc_2");
    desc2.textContent = weatherData.days[0].description;

    const cityName = document.querySelector(".weather-info__city");
    cityName.textContent = weatherData.resolvedAddress;

    const temp = document.querySelector(".weather-info__temp");
    temp.textContent = `${weatherData.currentConditions.temp} ${unitTemp}`;

    let timezone = weatherData.tzoffset;
    const date = document.querySelector(".weather-info__date");
    date.textContent = getTime(timezone).date;

    const time = document.querySelector(".weather-info__time");
    time.textContent = getTime(timezone).time;

    const icon = document.querySelector(".weather-info__icon");
    icon.innerHTML = await getIcon(weatherData.currentConditions.icon);
    getBackgroundVideo(weatherData.currentConditions.icon);

    const feelsLike = document.querySelector("#feels-like");
    feelsLike.textContent = `${weatherData.currentConditions.feelslike} ${unitTemp}`;
    
    const humidity = document.querySelector("#humidity");
    humidity.textContent = `${weatherData.currentConditions.humidity} %`;

    const chanceOfPrecipitation = document.querySelector("#chance-of-precipitation");
    chanceOfPrecipitation.textContent = `${weatherData.currentConditions.precipprob} %`;

    const wind = document.querySelector("#wind-speed");
    wind.textContent = `${weatherData.currentConditions.windspeed} ${unitSpeed}`;
}

async function renderForecast(city, unit){
    if(!city){
        city = currentCity;
    }
    if(!unit){
        unit = currentUnit;
    }

    currentCity = city;
    let unitTemp;

    if(unit === "metric"){
        unitTemp = "°C";
    }else if(unit === "us"){
        unitTemp = "°F";
    }

    const weatherData = await getWeatherData(city, unit);

    const forecast = document.querySelector(".forecast");
    forecast.innerHTML = "";
    for(let i = 0; i < 7; i++){
        const day = document.createElement("div");
        day.classList.add("forecast-daily");
        day.id = `day-${i}`;

        const dayName = document.createElement("div");
        dayName.classList.add("forecast-daily__day");
        dayName.textContent = getDayName(weatherData.days[i].datetime);

        const icon = document.createElement("div");
        icon.classList.add("forecast-daily__icon");
        icon.innerHTML = await getIcon(weatherData.days[i].icon);

        const temp = document.createElement("div");
        temp.classList.add("forecast-daily__temp");

        const maxTemp = document.createElement("span");
        maxTemp.classList.add("forecast-daily__temp-high");
        maxTemp.textContent = `${weatherData.days[i].tempmax} ${unitTemp}`;

        const minTemp = document.createElement("span");
        minTemp.classList.add("forecast-daily__temp-low");
        minTemp.textContent = `${weatherData.days[i].tempmin} ${unitTemp}`;

        temp.appendChild(maxTemp);
        temp.appendChild(minTemp);

        day.appendChild(dayName);
        day.appendChild(icon);
        day.appendChild(temp);

        forecast.appendChild(day);
    }
}

export {renderWeatherInfo, getInputValue, renderForecast}