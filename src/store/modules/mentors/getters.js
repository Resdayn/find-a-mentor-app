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

    }
};