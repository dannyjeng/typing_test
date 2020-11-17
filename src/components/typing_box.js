import React, { useState, useEffect } from 'react';
import generate from './words';
import useKeyPress from './useKeyPress';
import { currentTime } from '../utils/time';
import { Button } from 'react-bootstrap';
import { FaRedoAlt } from 'react-icons/fa';
import secondsToTime from './convert_seconds_to_time';

import './typing_box.css';

// Tutorial taken from:
// https://medium.com/better-programming/create-a-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820 
// TODO: Add timer, limit words to 4 letter, 5 letter, etc., track top results in a database

const initialWords = generate();

const TypingBox = () => {

    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );

    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);

    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState('');

    const [countdownTime, setCountdownTime] = useState(60);

    // Copied in from './timer_countdown.js' because too many state changes needed.
    // Unsure how to deal with these...TODO: learn Redux to deal with this?
    const CountdownTimer = (trigger, seconds) => {

        const [timeLeft, setTimeLeft] = useState(seconds);
        const [timerOn, setTimerOn] = useState(false);
        const displayTime = secondsToTime(timeLeft);

        const resetTimer = () => {
            const resetWords = generate()
            setOutgoingChars('');
            setCurrentChar(resetWords.charAt(0));
            setIncomingChars(resetWords.substr(1));
            setStartTime();
            setWordCount();
            setWpm(0);
            setAccuracy(0);
            setTypedChars('');
            setCountdownTime(60);
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

        return ([displayTime.m, displayTime.s]);
    };

    const [m, s] = CountdownTimer(typedChars, countdownTime);

    return(
        useKeyPress((key) => {

            if (!startTime) {
                setStartTime(currentTime());
            }

            let updatedOutgoingChars = outgoingChars;
            let updatedIncomingChars = incomingChars;

            if (key === currentChar) {

                if (leftPadding.length > 0) {
                    setLeftPadding(leftPadding.substring(1));
                }

                updatedOutgoingChars += currentChar
                setOutgoingChars(updatedOutgoingChars);

                setCurrentChar(incomingChars.charAt(0));

                updatedIncomingChars = incomingChars.substring(1);
                if (updatedIncomingChars.split(' ').length < 10) {
                    updatedIncomingChars +=' ' + generate();
                }

                setIncomingChars(updatedIncomingChars);

                if (incomingChars.charAt(0) === ' ') {
                    setWordCount(wordCount + 1)
                    const durationInMinutes = (currentTime() - startTime) / 60000.0; // currentTime() returns in milliseconds
                    setWpm(((wordCount + 1) / durationInMinutes).toFixed(2)); // Without +1, wpm is 0 after first word. Didn't update wordCount?
                }
            };

            // Calculating accuracy. It's the number of correctly typed keys divided by total number of keys typed in.
            const updatedTypedChars = typedChars + key; // Storing all typed keys in a string
            setTypedChars(updatedTypedChars);
            setAccuracy(
                (100 * (updatedOutgoingChars.length) / updatedTypedChars.length).toFixed(2)
            );
        }),

        <div className='mainBody'>
            <p className='Character'>
                <span className='Character-out'>
                    {(leftPadding + outgoingChars).slice(-20)}
                </span>
                <span className='Character-current'>
                    {currentChar}
                </span>
                <span>
                    {incomingChars.substr(0, 20)}
                </span>
            </p>
            <h3>
                {m}:{s}
                {/*<Button variant="outline-dark" onClick={() => resetTimer()}>
                    <FaRedoAlt/>
                </Button>*/}
            </h3>
            <h3>
                WPM: {wpm} | ACC: {accuracy}%
            </h3>
        </div>
    );
}

export default TypingBox;
