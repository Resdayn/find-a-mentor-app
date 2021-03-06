export default {
    mentors(state) {
        return state.mentors;
    },
    hasMentors(state ) {
        // checks if the array of mentors is empty and returns true if the below declaration is correct.
        return state.mentors && state.mentors.length > 0
    },
    isMentor(_, getters, _2, rootGetters) {
        // Loops through the all the mentors trying to find if the user logged is already one of the coaches.
        const mentors = getters.mentors;
        const userId = rootGetters.userId;
        return mentors.some(mentor => mentor.id === userId); // true if at least one is true.
    },
    shouldUpdateMentors(state) {
        // Checks if more than one minute happened before the last mentor fetch.
        // Because it is not necessary to update the mentor list in realtime. They don't change that much.
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            // return true if no timestamp was sent (on first load)
            return true
        }
        
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};