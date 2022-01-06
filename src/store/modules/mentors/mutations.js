export default {
    registerMentor(state, payload) {
        // This receives the payload from the action in the correct format and adds it to the list of mentors.
        state.mentors.push(payload);
    }
};