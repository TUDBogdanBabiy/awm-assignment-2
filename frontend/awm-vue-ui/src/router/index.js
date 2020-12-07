import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const authenticated = false;

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => {
      if (authenticated) {
        return import('../views/Home.vue');
      } else {
        return import('../views/GuestHome.vue');
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => {
      return import("../views/Login.vue");
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => {
      return import("../views/Register.vue");
    }
  },
  {
    path: authenticated ? '/map' : '/',
    name: "Map",
    component: () => {
      return import("../views/Map.vue");
    },
  },
  {
    path: '*',
    name: "NotFound",
    redirect: '/'
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
