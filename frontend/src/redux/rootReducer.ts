
import {combineReducers} from 'redux';
import userReducer from './slices/user';


const rootReducer = combineReducers({
    user:userReducer,
})

export {rootReducer};