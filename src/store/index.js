import { createStore } from "vuex";

import mentorsModule from "./modules/mentors/index";
import requestModule from "./modules/requests/index";

const store = createStore({
  modules: { 
      mentors: mentorsModule,
      requests: requestModule
    },
    state() {
      return {
        userId: 'c3'
      }
    },
    getters: {
       userId(state) {
        return state.userId;
       }
    }
});

export default store;
