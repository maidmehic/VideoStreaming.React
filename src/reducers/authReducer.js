const INITIAL_STATE = {
    isSignedIn: null,
    userInfo: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HANDLE_AUTHENTICATION':
            return { ...state, isSignedIn: action.payload.isSignedIn, userInfo: action.payload.userInfo };
        default:
            return state;
    };
};