import fireBaseToken from "../../../../token.js"

export default {
  async registerMentor(context, data) {
    // Used in MentorRegistration.vue to receive the data from the form and send it to the registerMentor mutation.
    const userId = context.rootGetters.userId;
    const mentor = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    // Sends to FireBase
    const response = await fetch(`${fireBaseToken.token}/mentors/${userId}.json`, {
      method: 'PUT', // PUT overwrites if there is no entry, POST always create new entries
      body: JSON.stringify(mentor)
    });

    if(!response.ok) {
      // throw error
    }

    context.commit('registerMentor', {
      ...mentor,
      id: userId // we add the user id here because is already in the root store and is not needed to be sent to the server
    }); 
  },
};
