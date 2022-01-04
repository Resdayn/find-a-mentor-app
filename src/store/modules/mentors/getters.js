export default {
    mentors(state) {
        return state.mentors;
    },
    hasMentors(state ) {
        // checks if the array of mentors is empty and returns true if the below declaration is correct.
        return state.mentors && state.mentors.length > 0
    }
};