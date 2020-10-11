import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

import './typing_box.css';

class TypingBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: '',
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
                <h1>Typing Test</h1>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Sample text
                        </Card.Text>
                    </Card.Body>
                </Card>
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
