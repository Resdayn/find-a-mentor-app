import { createRouter, createWebHistory } from "vue-router";

import MentorDetails from "./components/pages/mentors/MentorDetails.vue";
import MentorRegistration from "./components/pages/mentors/MentorRegistration.vue";
import MentorsList from "./components/pages/mentors/MentorsList.vue";
import ContactMentor from "./components/pages/requests/ContactMentor.vue";
import RequestsReceived from "./components/pages/requests/RequestsReceived.vue";
import NotFound from "./components/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/mentors" },
    { path: "/mentors", component: MentorsList },
    {
      path: "/mentors/:id",
      props: true,
      component: MentorDetails,
      children: [
        { path: "contact", component: ContactMentor }, // This will load the contact page for a specific mentor
      ],
    },
    { path: "/register", component: MentorRegistration },
    { path: "/requests", component: RequestsReceived },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
