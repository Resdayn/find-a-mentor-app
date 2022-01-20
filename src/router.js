import { createRouter, createWebHistory } from "vue-router";

// import MentorDetails from "./components/pages/mentors/MentorDetails.vue";
// import MentorRegistration from "./components/pages/mentors/MentorRegistration.vue";
// import MentorsList from "./components/pages/mentors/MentorsList.vue";
// import ContactMentor from "./components/pages/requests/ContactMentor.vue";
// import RequestsReceived from "./components/pages/requests/RequestsReceived.vue";
// import UserAuth from "./components/pages/auth/UserAuth.vue";
// import NotFound from "./components/pages/NotFound.vue";
import store from "./store/index.js";

// Dynamic Imports (Lazy Loading)
const MentorDetails = () => import("./components/pages/mentors/MentorDetails.vue");
const MentorRegistration = () => import("./components/pages/mentors/MentorRegistration.vue");
const MentorsList = () => import("./components/pages/mentors/MentorsList.vue");
const ContactMentor = () => import("./components/pages/requests/ContactMentor.vue");
const RequestsReceived = () => import("./components/pages/requests/RequestsReceived.vue");
const UserAuth = () => import("./components/pages/auth/UserAuth.vue");
const NotFound = () => import("./components/pages/NotFound.vue");

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
    { path: "/register", component: MentorRegistration, meta: {requiresAuth: true} },
    { path: "/requests", component: RequestsReceived, meta: {requiresAuth: true} },
    { path: "/auth", component: UserAuth, meta: {requiresNoAuth: true} },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // If the route requires authorization and the user is not authenticated then redirects to auth
    next('/auth');
  } else if (to.meta.requiresNoAuth && store.getters.isAuthenticated) {
    // If the route requires no authentication but the user is authenticated
    next("/mentors");
  } else {
    next();
  }
})

export default router;
