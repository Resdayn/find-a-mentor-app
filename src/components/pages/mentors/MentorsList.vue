<template>
  <section>
    <mentor-filter @change-filter="setFilters"></mentor-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadMentors" mode="outline">Refresh list</base-button>
        <base-button link to="/register" v-if="!isMentor && !isLoading">Register as Mentor</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasMentors">
        <mentor-item
          v-for="mentor in filteredMentors"
          :key="mentor.id"
          :id="mentor.id"
          :firstName="mentor.firstName"
          :lastName="mentor.lastName"
          :rate="mentor.hourlyRate"
          :areas="mentor.areas"
        ></mentor-item>
      </ul>
      <h3 v-else>There are no available mentors yet</h3>
    </base-card>
  </section>
</template>

<script>
import MentorItem from "../../mentors/MentorItem.vue";
import MentorFilter from "../../mentors/MentorFilter.vue";
export default {
  components: { MentorItem, MentorFilter },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false
    };
  },
  computed: {
    filteredMentors() {
      // loops through all the stored mentors and filters them according to the selected chekboxes in the filter.
      // It checks that the key is True in activeFilters and that the mentor has that area, if not it returns false and
      // it is not included in the array
      const mentors = this.$store.getters["mentors/mentors"];
      return mentors.filter((mentor) => {
        if (this.activeFilters.frontend && mentor.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && mentor.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && mentor.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasMentors() {
      return !this.isLoading && this.$store.getters["mentors/hasMentors"];
    },
    isMentor() {
      return this.$store.getters["mentors/isMentor"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadMentors() {
      // Since Vuex dispatch returns a promise we can async this function.
      this.isLoading = true;
      await this.$store.dispatch('mentors/loadMentors');
      this.isLoading = false;
    }
  },
  created() {
    this.loadMentors();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
