import fireBaseToken from "../../../../token.js";
export default {
  async contactMentor(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(`${fireBaseToken.token}/requests/${payload.mentorId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to sent request!');
      throw error;
    }

    const responseData = await response.json() // We need this so FireBase returns us the actual ID of this request.
    // Now we store the request id and mentor id locally, no need to send it to the server. It's only for display.
    newRequest.id = responseData.name;
    newRequest.mentorId = payload.mentorId;
    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    // Make sure to fetch only the requests of the logged mentor.
    const mentorId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    
    const response = await fetch(`${fireBaseToken.token}/requests/${mentorId}.json?auth=${token}`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests!');
      throw error;
    }

    // Transform firebase object into an array of requests

    const requests = [];

    for (const requestId in responseData){
      const request = {
        id: requestId,
        mentorId: mentorId,
        email: responseData[requestId].email,
        message: responseData[requestId].message
      }
      requests.push(request);
    }

    context.commit("setRequests", requests);

  }
};
