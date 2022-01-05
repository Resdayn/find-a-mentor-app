<template>
    <section>
        FILTER
    </section>
    <section>
        <div class="controls">
            <button>Refresh list</button>
            <router-link to='/register'>Register as Mentor</router-link>
        </div>
        <ul v-if="hasMentors">
            <mentor-item v-for="mentor in filteredMentors" 
            :key="mentor.id"
            :id="mentor.id"
            :firstName="mentor.firstName"
            :lastName="mentor.lastName"
            :rate="mentor.hourlyRate"
            :areas="mentor.areas"
            ></mentor-item> 
        </ul>
        <h3 v-else>There are no available mentors yet</h3>
    </section>
</template> 

<script>
import MentorItem from '../../mentors/MentorItem.vue';
export default {
  components: { MentorItem },
    computed: {
        filteredMentors() {
            return this.$store.getters['mentors/mentors'];
        },
        hasMentors() {
            return this.$store.getters['mentors/hasMentors'];
        }
    }
}
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