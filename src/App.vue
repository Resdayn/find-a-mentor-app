<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "../src/components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      // watches for changes in didAutoLogout computed property.
      // If there is a change in the didAutoLog state in Vuex, it means the user was autologged out and it always redirects to the main screen
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace("/mentors");
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: "Titillium Web", sans-serif;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
