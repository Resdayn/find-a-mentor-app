import firebaseKey from "../../../../token";

let timer; // Holds a global timer that can be later deactivated by other functions.

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
    // Remove the local store if any.
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("fullName");

    // Clear the autologout timer
    clearTimeout(timer);

    context.commit("setUser", {
      userId: null,
      token: null,
      fullName: ''
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

    // HTTP request to obtain the user's full name:
    const secondResponse = await fetch(`${firebaseKey.token}/mentors/${responseData.localId}.json`);
    const secondResponseData = await secondResponse.json();
    const fullName = `${secondResponseData.firstName} ${secondResponseData.lastName}`;

    // Save data to local storage
    const tokenExpiresIn = +responseData.expiresIn * 1000; // changes the string to integer (the +) and converts it to milisecs
    // const tokenExpiresIn = 5000; // FOR TESTING
    const tokenExpirationDate = new Date().getTime() + tokenExpiresIn; // Calculates the date by multiplying current time in milisec by duration

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", tokenExpirationDate);
    localStorage.setItem("fullName", fullName);

    // Sets a timer to auto-logout the user
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, tokenExpiresIn);

    // If everything is successfull, commits the setUser mutation to save the server data in Vuex
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      fullName: fullName
    });
  },

  autoLogin(context) {
    // Retrieves the data from local storage and commits setUser with it. If not, autologin will not be executed.

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const fullName = localStorage.getItem("fullName");
    const tokenExpiration = localStorage.getItem("tokenExpiration"); // Will return a date in the future

    const expiresIn = +tokenExpiration - new Date().getTime(); // difference in milisecs between the expirate date and the current date.

    // Checks whether the token is expired

    if (expiresIn < 0) {
      // In this situation the token is now expired, so no autologin
      return;
    } else {
      timer =
        (() => {
          context.dispatch("autoLogout");
        },
        expiresIn);
    }

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        fullName: fullName
      });
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
