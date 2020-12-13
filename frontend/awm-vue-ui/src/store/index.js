import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import friends from "./modules/friends";
import locationHistory from "./modules/locationHistory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    friends,
    locationHistory
  }
});
