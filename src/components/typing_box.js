import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import './typing_box.css';

class TypingBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: '',
            time: {},
        };
        this.timer = 0;
        this.seconds = 60; // The starting time on the clock.
    }

    componentDidMount() {
        let timeLeft = this.secondsToTime(this.seconds);
        this.setState({ time: timeLeft });
    }

    secondsToTime(s) {
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

    startTimer = () => {
        if (this.timer === 0 && this.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        this.seconds = this.seconds - 1;
        this.setState({
            time: this.secondsToTime(this.seconds),
        });

        if (this.seconds === 0) {
            clearInterval(this.timer); // To stop setInterval() from going into the negatives.
        }
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
        }
    }

    render() {
        return (
            <Container>
                <Button onClick={this.startTimer}>{this.state.time.m}:{this.state.time.s}</Button>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Sample text
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                {/**
                    Put a refresh symbol next to the input text box.
                    Start timer countdown when this.state.word is not empty.
                **/}

                <InputGroup onKeyUp={this.handleKeyUp}>
                    <FormControl 
                    type='text'
                    placeholder='Type here...'
                    size='lg'
                    autoFocus={true}
                    value={this.state.word}
                    onChange={this.onWordChange}
                    />
                </InputGroup>
            </Container>
        )
    }
}

export default TypingBox
