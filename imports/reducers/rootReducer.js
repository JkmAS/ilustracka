/**
 * Root reducer. It utilizes reducer composition to make our code modular.
 */

import { combineReducers } from 'redux';
import message from './../reducers/message.js';
import filter from './../reducers/searchFilter.js';
import limit from './../reducers/pagination.js';

const rootReducer = combineReducers({
    message,
    filter,
    limit
});

export default rootReducer;
