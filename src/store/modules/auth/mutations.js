export default {
    setUser(state, payload) {
        // Adds the new user to the Store
        state.token = payload.token;
        state.userId = payload.userI;
        state.tokenExpiration = payload.tokenExpiration;
    }
}