export default {
    requests(state) {
        return state.requests;
    },
    hasRequests(state) {
        //returns boolean according to the  expresion below
        return state.requests && state.requests.length > 0;
    }
}