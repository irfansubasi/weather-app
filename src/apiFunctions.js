import { getInputValue } from "./domFunctions";

let lat = 0;
let lon = 0;



async function getCoordinates(city) {

    
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=40e8f5b8633d96e1ec7eef7b3da5be90`, {mode: 'cors'});
    const weatherData = await response.json();

    lat = weatherData[0].lat;
    lon = weatherData[0].lon;
    return getWeatherData(lat, lon);
    
}

async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=40e8f5b8633d96e1ec7eef7b3da5be90&units=metric`, {mode: 'cors'});
    const weatherData = await response.json();
    return weatherData;
}

export default getCoordinates;



