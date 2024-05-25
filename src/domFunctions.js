import getWeatherData from "./apiFunctions";
import {getTime, getIcon} from "./utils";

function getInputValue(){
    const input = document.querySelector(".search-box");
    const button = document.querySelector(".search-button");
    button.addEventListener("click", function(){
        renderWeatherInfo(input.value);
    });
    input.addEventListener("keyup", function(e){
        if(e.key === "Enter"){
            renderWeatherInfo(input.value);
        }
    });
}

async function renderWeatherInfo(city){
    if(!city){
        city = "London";
    }
    const weatherData = await getWeatherData(city);
    const desc = document.querySelector(".weather-info__desc");
    desc.textContent = weatherData.currentConditions.conditions;

    const desc2 = document.querySelector(".weather-info__desc_2");
    desc2.textContent = weatherData.days[0].description;

    const cityName = document.querySelector(".weather-info__city");
    cityName.textContent = weatherData.resolvedAddress;

    const temp = document.querySelector(".weather-info__temp");
    temp.textContent = `${weatherData.currentConditions.temp} °C`;

    let timezone = weatherData.tzoffset;
    const date = document.querySelector(".weather-info__date");
    date.textContent = getTime(timezone).date;

    const time = document.querySelector(".weather-info__time");
    time.textContent = getTime(timezone).time;

    const icon = document.querySelector(".weather-info__icon");
    icon.innerHTML = await getIcon(weatherData.currentConditions.icon);

    const feelsLike = document.querySelector("#feels-like");
    feelsLike.textContent = `${weatherData.currentConditions.feelslike} °C`;
    
    const humidity = document.querySelector("#humidity");
    humidity.textContent = `${weatherData.currentConditions.humidity} %`;

    const chanceOfPrecipitation = document.querySelector("#chance-of-precipitation");
    chanceOfPrecipitation.textContent = `${weatherData.currentConditions.precipprob} %`;

    const wind = document.querySelector("#wind-speed");
    wind.textContent = `${weatherData.currentConditions.windspeed} km/h`;
}

export {renderWeatherInfo, getInputValue}