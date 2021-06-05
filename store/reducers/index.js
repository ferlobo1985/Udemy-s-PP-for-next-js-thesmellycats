import { combineReducers } from 'redux';
import user from './user.reducer'

const appReducers = combineReducers({
    user
});

export default appReducers;
