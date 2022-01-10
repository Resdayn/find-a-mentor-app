import fireBaseToken from "../../../../token.js";

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
    // Sends request to FireBase
    const response = await fetch(
      `${fireBaseToken.token}/mentors/${userId}.json`,
      {
        method: "PUT", // PUT overwrites if there is no entry, POST always create new entries
        body: JSON.stringify(mentor),
      }
    );

    if (!response.ok) {
      // throw error
    }

    context.commit("registerMentor", {
      ...mentor,
      id: userId, // we add the user id here because is already in the root store and is not needed to be sent to the server
    });
  },

  async loadMentors(context) {
    //sends a get request to FireBase
    const response = await fetch(`${fireBaseToken.token}/mentors.json`);
    const responseData = await response.json();
    if (!response.ok) {
      // Throw ERROR
    }

    // Now we transform the big object return from firebase into an array of mentors
    const mentors = [];

    for (const key in responseData) {
      const mentor = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      mentors.push(mentor);
      context.commit('setMentors', mentors);
    }
  },
};
