import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => {
      return import('../views/Home.vue');
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
    path: localStorage.token ? '/map/:user' : '/',
    name: "Map",
    component: () => {
      return import("../views/Map.vue");
    },
  },
  {
    path: localStorage.token ? '/location-history/:user' : '/',
    name: "Location History",
    component: () => {
      return import("../views/LocationHistory.vue");
    },
  },
  {
    path: localStorage.token ? '/friends/:user' : '/',
    name: "Friends",
    component: () => {
      return import("../views/Friends.vue");
    },
  },
  {
    path: '*',
    name: "NotFound",
    redirect: '/'
  }
];



const router = new VueRouter({
  base: '/',
  routes
});

export default router;
