import { addHours, format } from 'date-fns';
import { UTCDate } from "@date-fns/utc";

function getTime(timezone) {
    const utcDate = new UTCDate();
    const adjusted = addHours(utcDate, timezone);

    const time = format(adjusted, 'hh:mm aa');
    const date = format(adjusted, 'dd MMM yyyy');

    return { time, date };
}

async function getIcon(iconName) {
    const iconPath = `./images/Icons/${iconName}.svg`;
    const response = await fetch(iconPath);
    const icon = await response.text();
    return icon;
}

function getDayName(date) {
    const day = format(date, 'EEEE');
    return day;
}

function getBackgroundVideo(iconName) {
    if(iconName === "clear-day" || iconName === "clear-night") {
        iconName = "clear";
    }else if(iconName === "partly-cloudy-day" || iconName === "partly-cloudy-night") {
        iconName = "cloudy";
    }else if(iconName === "sleet") {
        iconName = "hail";
    }else if(iconName === "rain-snow" || iconName === "rain-snow-showers-day" || iconName === "rain-snow-showers-night" || iconName === "snow-showers-day" || iconName === "snow-showers-night") {
        iconName = "snow";
    }else if(iconName === "showers-day" || iconName === "showers-night") {
        iconName = "rain";
    }else if(iconName === "thunder" || iconName === "thunder-showers-day" || iconName === "thunder-showers-night" || iconName === "thunder-rain") {
        iconName = "storm";
    }
    const videoPath = `images/${iconName}.mp4`;
    const video = document.querySelector(".video-bg");
    const source = video.querySelector("source");
    source.src = videoPath;
    video.load();
}

function errorMessage(){
    const errorDiv = document.querySelector(".weather-info__error");
    errorDiv.style.display = "block";
    errorDiv.textContent = "City not found! Please type a valid city name.";
}

export {getTime, getIcon, getDayName, getBackgroundVideo, errorMessage};