import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import generate from './words';
import useKeyPress from './useKeyPress';
import { currentTime } from '../utils/time';
import { Button } from 'react-bootstrap';
import { FaRedoAlt } from 'react-icons/fa';
import secondsToTime from './convert_seconds_to_time';
import CountdownTimer from './timer_countdown';

import { useDispatch, useSelector } from 'react-redux';

import './typing_box.css';

// Tutorial taken from:
// https://medium.com/better-programming/create-a-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820 
// TODO: User select time (30sec, 30sec, 30sec, 1 min, 2 min, 5 min, etc), limit words to 4 letter, 5 letter, etc., track top results in a database

let initialWords = generate();

const TypingBox = () => {
    const dispatch = useDispatch();

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

    const countdownTime = useSelector(state => state.countdownReducer);
    const displayTime = secondsToTime(countdownTime);
    CountdownTimer(typedChars, countdownTime);

    const reset = () => {
        initialWords = generate();
        dispatch({ type: 'RESET_TIMER' });
        setLeftPadding(new Array(20).fill(' ').join(''));
        setOutgoingChars('');
        setCurrentChar(initialWords.charAt(0));
        setIncomingChars(initialWords.substr(1));
        setStartTime();
        setWordCount(0);
        setWpm(0);
        setAccuracy(0);
        setTypedChars('');
    }

    const handleOnClick = (e) => {
        // Returns 1 if mouse clicked, and returns 0 if triggered by pressing "space" or "enter".
        // This prevents "space" from calling reset() accidentally after already clicking the reset button once.
        // Useful because the button stays in focus after the first click, so hitting "space" would call reset() again.
        if (e.detail) {
            reset();
        }
    }

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
                    setWpm(((wordCount + 1) / durationInMinutes)); // Without +1, wpm is 0 after first word. Didn't update wordCount?
                }
            };

            // Calculating accuracy. It's the number of correctly typed keys divided by total number of keys typed in.
            const updatedTypedChars = typedChars + key; // Storing all typed keys in a string
            setTypedChars(updatedTypedChars);
            setAccuracy(
                (100 * (updatedOutgoingChars.length) / updatedTypedChars.length)
            );
        }),

        <div className='main'>
            <div className='timer'>
                {displayTime.m}:{displayTime.s}
            </div>
            <div className='textBody'>
                <h1 className='Character'>
                    <span className='Character-out'>
                        {(leftPadding + outgoingChars).slice(-20)}
                    </span>
                    <span className='Character-current'>
                        {currentChar}
                    </span>
                    <span>
                        {incomingChars.substr(0, 20)}
                    </span>
                </h1>
            </div>
            <Button variant="outline-dark" onClick={(e) => handleOnClick(e)}>
                <FaRedoAlt/>
            </Button>
            <Container>
                <Row>
                    <Col className='headCol' md='6'>
                        words per min:
                    </Col>
                    <Col className='valCol' md='1'>
                        {(wpm).toFixed(2)}
                    </Col>
                </Row>
                <Row>
                    <Col className='headCol' md='6'>
                        accuracy (%):
                    </Col>
                    <Col className='valCol' md='1'>
                        {(accuracy).toFixed(2)}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TypingBox;
