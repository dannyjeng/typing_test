import { combineReducers } from 'redux';
import countdownReducer from './countdownReducer';

const rootReducer = combineReducers({
    countdownReducer,
});

export default rootReducer;
