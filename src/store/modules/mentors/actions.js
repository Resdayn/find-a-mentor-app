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
    // Sends request to FireBase with the token
    const token = context.rootGetters.token;

    const response = await fetch(
      `${fireBaseToken.token}/mentors/${userId}.json?auth=${token}`,
      {
        method: "PUT", // PUT overwrites if there is no entry, POST always create new entries
        body: JSON.stringify(mentor),
      }
    );

    if (!response.ok) {
      // TODO: HANDLE ERROR
    }

    context.commit("registerMentor", {
      ...mentor,
      id: userId, // we add the user id here because is already in the root store and is not needed to be sent to the server
    });
  },

  async loadMentors(context, payload) {
    // Check first if we can fetch

    if (!payload.forceRefresh && !context.getters.shouldUpdateMentors) {
      // end execution and not update the list of mentors.
      return;
    }

    // If so, proceeds to send a get request to FireBase
    const response = await fetch(`${fireBaseToken.token}/mentors.json`);
    const responseData = await response.json();
    if (!response.ok) {
      // The component that dispatched this action will receive the error object.
      const error = new Error(
        responseData.message ||
          "Failed to retrieve data. Please try again later."
      );
      throw error;
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
      context.commit("setMentors", mentors);
      context.commit("setFetchTimeStamp");
    }
  },
};
