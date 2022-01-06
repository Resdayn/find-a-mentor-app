<template>
  <section>
    <base-card>
      <h2>Register as a Mentor Now!</h2>
      <mentor-form @save-data="saveData"></mentor-form>
    </base-card>
  </section>
</template>

<script>
import MentorForm from "../../mentors/MentorForm.vue";
export default {
  components: {
    MentorForm,
  },
  methods: {
      saveData(data) {
          this.$store.dispatch('mentors/registerMentor', data);
          this.$router.replace('/mentors'); //similar to $otuer.push but you can't go back to the previous page.
      }
  }
};
</script>
