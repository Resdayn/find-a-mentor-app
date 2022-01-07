export default {
    requests(state, _, _2, rootGetters) {
        // access to userId in the root store through rootGetters 
        const mentorId = rootGetters.userId;
        return state.requests.filter( request => request.mentorId === mentorId);
    },
    hasRequests(_, getters) {
        //returns boolean according to the  expresion below
        return getters.requests && getters.requests.length > 0;
    }
}