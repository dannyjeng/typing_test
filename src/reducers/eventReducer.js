import initialState from './initialState';
import { RESET_TIMER } from '../actions/actionTypes';

const resetTimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_TIMER:
            console.log(state)
            return state
            //return [...state, action.payload]
        default:
            return state
    }
}

export default resetTimerReducer
