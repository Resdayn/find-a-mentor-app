

export default {
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setRequests(state, payload){
        // adds an array of requests to the vuex local storage for requests
        state.requests = payload;
    }
}