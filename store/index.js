import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    appReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;