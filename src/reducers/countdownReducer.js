import initialState from './initialState';
import { DECREMENT_TIMER } from '../actions/actionTypes';

const countdownReducer = (state = initialState.countdownTime, action) => {
    switch (action.type) {
        case DECREMENT_TIMER:
            if (state === 0) {
                return state
            }
            return state - 1
        default:
            return state
    }
}

export default countdownReducer;
