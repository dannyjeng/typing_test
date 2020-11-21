import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import countdownReducer from './countdownReducer';

const rootReducer = combineReducers({
    eventReducer,
    countdownReducer,
});

export default rootReducer;
