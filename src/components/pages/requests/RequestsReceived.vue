<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error ocurred :("
      @close="handleError"
    >{{error}}</base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from "../../requests/RequestItem.vue";
import BaseDialog from "../../ui/BaseDialog.vue";
export default {
  components: {
    RequestItem,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Couldn't load any request";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
