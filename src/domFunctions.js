import getCoordinates from "./apiFunctions";

function getInputValue(){
    const input = document.querySelector(".search-box");
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
    const weatherData = await getCoordinates(city);
    const desc = document.querySelector(".weather-info__desc");
    desc.textContent = weatherData.weather[0].description;

    const cityName = document.querySelector(".weather-info__city");
    cityName.textContent = weatherData.name;

    const temp = document.querySelector(".weather-info__temp");
    temp.textContent = weatherData.main.temp;
    
}

export {renderWeatherInfo, getInputValue}