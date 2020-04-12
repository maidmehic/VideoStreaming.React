export const handleAuthentication = (authStatus) => {
    return {
        type: "HANDLE_AUTHENTICATION",
        payload: authStatus
    };
};