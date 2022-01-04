import { createStore } from "vuex";

import mentorsModules from "./modules/mentors/index";

const store = createStore({
  modules: { 
      mentors: mentorsModules 
    },
});

export default store;
