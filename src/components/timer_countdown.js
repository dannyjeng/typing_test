import { useState, useEffect } from 'react';
import secondsToTime from './convert_seconds_to_time';

const countdownTimer = (event) => {

    const startTime = 60;
    const [currentTime, setCurrentTime] = useState(startTime);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {

        const startTimer = () => {
            if (timer === 0 && currentTime > 0) {
                setTimer(setInterval(countDown, 1000));
            }
        }

        const countDown = () => {
            setSecondsElapsed(secondsElapsed + 1);
            setCurrentTime(currentTime - secondsElapsed);
            if (currentTime === 0) {
                clearInterval(timer)
            }
        }

        const resetTimer = () => {
            setCurrentTime(startTime);
            setSecondsElapsed(0);
            clearInterval(timer);
            setTimer(0);
        }
    });

    return 
}

export default countdownTimer;
