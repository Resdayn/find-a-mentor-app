import { createStore } from "vuex";

import mentorsModule from "./modules/mentors/index";
import requestModule from "./modules/requests/index";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    mentors: mentorsModule,
    requests: requestModule,
    auth: authModule,
  },
});

export default store;
