import { errorMessage } from "./utils";

async function getWeatherData(city, unit) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=${unit}&elements=datetime%2Cname%2Caddress%2CresolvedAddress%2Clatitude%2Clongitude%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecipprob%2Cwindspeed%2Cconditions%2Cdescription%2Cicon&iconSet=icons2&include=days%2Ccurrent%2Chours&key=86XF8HBCWDX522TSWSYY4QNG7&contentType=json`, {mode: 'cors'});
    if (!response.ok) {
        errorMessage();
        throw new Error('City not found');
    }
    const errorDiv = document.querySelector(".weather-info__error");
    errorDiv.style.display = "none";
    const weatherData = await response.json();
    return weatherData;
}

export default getWeatherData;


