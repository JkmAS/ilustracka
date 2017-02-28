/**
 * Redux store. The object that holds the application state and provides a few
 * helper methods to access the state, dispatch actions and register listeners.
 *
 * Redux thunk is implemented because of writing action creators
 * that return a function instead of an action.
 */

import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer.js';


const enhancers = [
    applyMiddleware(ReduxThunk)
];

const Store = createStore(rootReducer, {}, compose(...enhancers));

export default Store;