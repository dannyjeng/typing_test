import { combineReducers } from 'redux';
import resetTimerReducer from './eventReducer';
import countdownReducer from './countdownReducer';

const rootReducer = combineReducers({
    resetTimerReducer,
    countdownReducer,
});

export default rootReducer;
