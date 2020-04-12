const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HANDLE_AUTHENTICATION':
            return { ...state, isSignedIn: action.payload.isSignedIn, userId: action.payload.userId };
        default:
            return state;
    };
};