<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested in this mentor? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  // the id prop is passed through the router
  props: ["id"],
  data() {
    return {
      selectedMentor: null,
    };
  },
  computed: {
    contactLink() {
      if (this.$route.path.includes(this.id)) {
        return this.$route.path
      } else {
        return `${this.$route.path}/${this.id}/contact`;
      }
    },
    fullName() {
      return this.selectedMentor.firstName + " " + this.selectedMentor.lastName;
    },
    areas() {
      return this.selectedMentor.areas;
    },
    rate() {
      return this.selectedMentor.hourlyRate;
    },
    description() {
      return this.selectedMentor.description;
    },
  },
  created() {
    this.selectedMentor = this.$store.getters["mentors/mentors"].find(
      (mentor) => mentor.id === this.id
    );
  },
};
</script>
