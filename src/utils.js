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

export {getTime, getIcon};