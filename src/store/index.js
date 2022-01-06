import { createStore } from "vuex";

import mentorsModules from "./modules/mentors/index";

const store = createStore({
  modules: { 
      mentors: mentorsModules 
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
