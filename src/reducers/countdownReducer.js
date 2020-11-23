import initialState from './initialState';
import { DECREMENT_TIMER, RESET_TIMER } from '../actions/actionTypes';

//combine reset and countdown reducers into one, so add a new case here for reset; that way we can use the same initialState
//values
const countdownReducer = (state = initialState.countdownTime, action) => {
    switch (action.type) {
        case DECREMENT_TIMER:
            if (state === 0) {
                return state
            }
            return state - 1
        case RESET_TIMER:
            return initialState.countdownTime
        default:
            return state
    }
}

export default countdownReducer;
