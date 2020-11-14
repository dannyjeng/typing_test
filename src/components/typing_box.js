import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaRedoAlt } from 'react-icons/fa';
import secondsToTime from './convert_seconds_to_time';
import generate from './words';

import './typing_box.css';

// Disconnect timer from wpm; for wpm use what that site does
// The timer countdown component can just return the time...actually lets deal with that last
// Change everything else first to get the typing and wpm working, then connect the timer

class TypingBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: '',
            time: {},
        };
        this.timer = 0;
        this.seconds = 60; // The starting time on the clock.
        this.seconds_elapsed = 0;
    }

    componentDidMount() {
        let timeLeft = secondsToTime(this.seconds); // to convert the seconds to time
        this.setState({ time: timeLeft });
    }

    startTimer = () => {
        if (this.timer === 0 && this.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        this.seconds_elapsed = this.seconds_elapsed + 1
        this.setState({
            time: secondsToTime(this.seconds - this.seconds_elapsed),
        });

        if (this.seconds === this.seconds_elapsed) {
            clearInterval(this.timer); // To stop setInterval() from going into the negatives.
        }
    }

    resetTimer = () => {
        this.setState({ 
            word: '',
            time: secondsToTime(this.seconds),
        });
        this.seconds_elapsed = 0;
        document.getElementById('form').focus();
        clearInterval(this.timer);
        this.timer = 0; // clearInterval doesn't reset this.timer to 0
    }

    onWordChange = (event) => {
        this.setState({ word: event.target.value });
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            /**
            Use event.preventDefault() if doing onKeyDown instead of onKeyUp.

            The preventDefault() use is most apparent when missing. If you press space to set the 
            value of the InputGroup back to an empty string, you will notice an extra space appear
            in that InputGroup. 
            event.preventDefault() stops that space key from also registering as a normal space, 
            which is desirable in this case since we only want to deal with one word at a time.
            **/
            //event.preventDefault() 
            this.setState({ word: '' })
        } else if (
            /* 
            Other punctuation keyCodes seem to be inconsistent across OS and browsers.
            So I'll only check for  numbers, alpha keys, comma, period, and other characters that
            share those keys, such as in the case of Shift modified events. I.e. 1 and ! share the
            keyCode.
            For other keyCodes, see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            */
            (event.keyCode >= 48 && event.keyCode <= 57) || // numeric and shift modified(0-9)
            (event.keyCode >= 65 && event.keyCode <= 90) || // upper and lower case alpha (A-Z)
            (event.keyCode === 188) || // comma 
            (event.keyCode >= 190 && event.keyCode <= 191) // period and question mark
        )   {
            //console.log(event.target.value)
            if (this.timer === 0) {
                this.startTimer()
            }
        }
    }

    render() {
        return (
            <Container>
                {/*<Button className='custom-btn' onClick={this.startTimer}>{this.state.time.m}:{this.state.time.s}</Button>*/}
                <h1>Sample text </h1>

                <InputGroup 
                    className="mainBody" 
                    onKeyUp={this.handleKeyUp}
                >
                    <InputGroup.Prepend>
                        <Button 
                            className="custom-btn"
                            onClick={this.resetTimer}
                        >
                            <FaRedoAlt />
                        </Button>
                    </InputGroup.Prepend>
                    
                    <FormControl 
                        id='form'
                        type='text'
                        placeholder='Type here...'
                        size='lg'
                        autoFocus={true}
                        value={this.state.word}
                        onChange={this.onWordChange}
                    />

                    <InputGroup.Append>
                        <InputGroup.Text>
                            {this.state.time.m}:{this.state.time.s}
                        </InputGroup.Text>
                    </InputGroup.Append>

                </InputGroup>
            </Container>
        )
    }
}

export default TypingBox
