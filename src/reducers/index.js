import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";

export default combineReducers({
    authStatus: authReducer,
    form: formReducer //redux-form reducer
});