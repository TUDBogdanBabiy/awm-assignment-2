<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable type="dark" variant="dark" sticky>
        <b-navbar-brand href="/">{{ user ? user : "Home" }}</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <i v-if="expanded" class="fa fa-chevron-up" aria-hidden="true"></i>
            <i v-else class="fa fa-bars" aria-hidden="true"></i>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item :to="`/map/${user}`">Map</b-nav-item>
            <b-nav-item :to="`/location-history/${user}`"
              >Location History</b-nav-item
            >
            <b-nav-item :to="`/friends/${user}`">Friends</b-nav-item>
            <b-nav-item @click="logout()">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view :key="key" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      key: true,
      user: "",
    };
  },
  methods: {
    ...mapActions(["signOut", "verifyToken"]),
    async logout() {
      try {
        await this.signOut();
        this.$router.push({ name: "Home" });
        this.key = !this.key;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    if (localStorage.token) {
      try {
        this.user = await this.verifyToken(localStorage.token);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #cfd8e2;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
