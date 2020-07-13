import streams from "../api/streams";
import { HANDLE_AUTHENTICATION, FETCH_STREAMS, FETCH_STREAM, CREATE_STREAM, UPDATE_STREAM, DELETE_STREAM } from "./types";

export const handleAuthentication = (authStatus) => {
    return {
        type: HANDLE_AUTHENTICATION,
        payload: authStatus
    };
};

export const fetchStreams = () => {
    return async dispatch => {
        const response = await streams.get("/streams");
        dispatch({ type: FETCH_STREAMS, payload: response.data });
    }
};

export const fetchStream = (id) => {
    return async dispatch => {
        const response = await streams.get(`/streams/${id}`);
        dispatch({ type: FETCH_STREAM, payload: response.data });
    }
};

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().authStatus.userInfo;
        const response = await streams.post("/streams", { ...formValues, userId });
        dispatch({ type: CREATE_STREAM, payload: response.data });
    }
};

export const updateStream = (id, formValues) => {
    return async dispatch => {
        const response = await streams.put(`/streams/${id}`, formValues);
        dispatch({ type: UPDATE_STREAM, payload: response.data });
    }
};

export const deleteStream = (id) => {
    return async dispatch => {
        await streams.delete(`/streams/${id}`);
        dispatch({ type: DELETE_STREAM, payload: id });
    }
};