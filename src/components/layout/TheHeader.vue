<template>
    <header>
        <nav>
            <h1><router-link to="/">Find A Coding Mentor</router-link></h1>
            <ul>
                <li><router-link to='/mentors'>All Mentors</router-link></li>
                <li v-if="isLoggedIn"><router-link to='/requests'>Requests</router-link></li>
                <li v-else><router-link to='/auth'>Log In</router-link></li>
                <li v-if="isLoggedIn"><base-button @click="logout">Log Out</base-button></li>
                <li v-if="isLoggedIn"><h3>Logged in as {{userFullName}}</h3></li>
            </ul>
            
        </nav>
    </header>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userFullName() {
      return this.$store.getters.fullName;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/mentors');
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 a {
  color: white;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

h3 {
  color: white;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>