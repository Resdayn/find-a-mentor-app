export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    //returns true if there is a received token from FireBase
    return !!state.token;
  },
  didAutoLogout(state){
    return state.didAutoLogout;
  },
  fullName(state) {
    return state.fullName;
  }
};
