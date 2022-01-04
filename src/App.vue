<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "../src/components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
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
</style>
