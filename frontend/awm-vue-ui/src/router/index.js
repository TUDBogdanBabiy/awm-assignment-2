import Vue from "vue";
import VueRouter from "vue-router";
import GuestHome from "../views/GuestHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GuestHome",
    component: GuestHome
  },
  {
    path: '/login',
    name: 'Login',
    component: () => { return import('../views/Login.vue'); }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => { return import('../views/Register.vue'); }
  },
  {
    path: "/about",
    name: "About",
    component: function () {
      return import("../views/About.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
