export default {
  registerMentor(context, data) {
    // Used in MentorRegistration.vue to receive the data from the form and send it to the registerMentor mutation.
    const mentor = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };
    context.commit('registerMentor', mentor); 
  },
};
