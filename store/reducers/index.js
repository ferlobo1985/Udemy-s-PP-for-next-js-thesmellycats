import { combineReducers } from 'redux';
import user from './user.reducer';
import notifications from './notification.reducer';

const appReducers = combineReducers({
    user,
    notifications
});

export default appReducers;
