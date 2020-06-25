import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import streamReducer from './streamReducer';

export default combineReducers({
    authStatus: authReducer,
    streams: streamReducer,
    form: formReducer //redux-form reducer
});