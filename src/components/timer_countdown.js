import React, { useState, useEffect } from 'react';
import secondsToTime from './convert_seconds_to_time';
import { Button } from 'react-bootstrap';
import {FaRedoAlt } from 'react-icons/fa';

/*
Using:
https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks

After this component mounts, useEffect gets called and the state of timeLeft changes. 
React then re-renders the component because the state changed, and useEffect is called again. 
This continues until, in this case, it reaches the exit statement.

This answer provides a good explanation of how React handles useEffect:
https://stackoverflow.com/questions/56599583/useeffect-hook-example-what-causes-the-re-render
*/

const CountdownTimer = (trigger, seconds) => {

    const [timeLeft, setTimeLeft] = useState(seconds);
    const [timerOn, setTimerOn] = useState(false);
    const displayTime = secondsToTime(timeLeft);

    const resetTimer = () => {
        setTimeLeft(seconds);
        setTimerOn(false);
    }

    useEffect(() => {
        if (trigger) {
            setTimerOn(true);
        }
    }, [trigger]);

    // useEffect runs after every render
    // Same as componentDidUpdate in class components
    useEffect(() => {
        // Exit when timeLeft is 0
        if (!timeLeft) return;

        if (timerOn) {
            // Generate a new intervalId for each re-render
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            // Clear interval on re-render to avoid memory leaks
            // See: https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect
            return () => clearInterval(intervalId);
            // Add timeLeft as a dependecy to re-run the effect when we update it
        }
    }, [timeLeft, timerOn]);

    return (
        <div className='Timer'>
            <Button onClick={() => resetTimer()}>
                <FaRedoAlt/>
            </Button>
            <h1>{displayTime.m}:{displayTime.s}</h1>
        </div>
    );
};

export default CountdownTimer;
