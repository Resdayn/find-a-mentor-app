export default {
    setUser(state, payload) {
        // Adds the new user to the Store
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
        state.fullName = payload.fullName;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
}