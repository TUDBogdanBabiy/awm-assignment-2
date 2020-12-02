<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable type="dark" variant="dark" sticky>
        <b-navbar-brand href="/">Home</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <i v-if="expanded" class="fa fa-chevron-up" aria-hidden="true"></i>
            <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href="/about">About</b-nav-item>
            <b-nav-item href="#/logout" disabled>Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

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
