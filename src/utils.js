import { format } from 'date-fns';

function getUTCTime(timezone) {
    
    const now = new Date();

    const offset = timezone * 1000;
    const newTime = new Date(now.getTime() + offset);
    let hours = newTime.getUTCHours();
    const minutes = newTime.getUTCMinutes();

    let period = 'AM';
    if (hours >= 12) {
        period = 'PM';
    }

    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
    }

    const newUTCTime = hours + ':' + minutes + ' ' + period;
    const newUTCDate = format(newTime, 'dd MMM yyyy');

    return {
        time: newUTCTime,
        date: newUTCDate
    };
}

export default getUTCTime;
