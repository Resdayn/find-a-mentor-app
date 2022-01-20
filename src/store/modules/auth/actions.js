import firebaseKey from "../../../../token";
export default {
  async login(context, payload) {
    // returns the promised returned by the auth dispatch so it can be tracked in the component for error handling
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async signup(context, payload) {
    // returns the promised returned by the auth dispatch so it can be tracked in the component for error handling
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  logout(context) {
    context.commit("setUser", {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },

  async auth(context, payload) {
    // Logs in or signs up depending on the mode
    const mode = payload.mode; // login or sign up
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey.apiKey}`; // login url by default

    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey.apiKey}`;
    }

    //HTTP request 

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    // Error handling
    if (!response.ok) {
      const error = new Error(
        responseData.error.message ||
          "Failed to authenticate. Please check your login data"
      );
      throw error;
    }

    // Save data to local storage

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    // If everything is successfull, commits the setUser mutation to save the server data in Vuex
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  autoLogin(context) {
    // Retrieves the token and userId from local storage and commits setUser with it. If not, autologin will not be executed.
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null,
      })
    }
  }
};
