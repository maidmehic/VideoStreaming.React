import {
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    UPDATE_STREAM,
    DELETE_STREAM
} from '../actions/types'
import _ from 'lodash';


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }; //action.payload returns array, so we take that array and transform it to objects with mapKeys function. Also we merge it with current state and return new object
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}