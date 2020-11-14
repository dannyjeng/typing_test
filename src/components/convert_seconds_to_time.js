const secondsToTime = (s) => {
    let divisor_for_minutes = s % (60*60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds < 10) {
        seconds = '0' + seconds; // For padding the seconds.
    }

    let obj = {
        'm': minutes,
        's': seconds,
    };

    return obj;
}

export default secondsToTime
