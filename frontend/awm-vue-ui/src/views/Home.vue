<template>
  <div class="home">
    <div v-if="authenticated">
      <h2 class="mt-4">Welcome back {{ user }}!</h2>
      <div v-if="locations.length == 0">
        <h3>You do not have any locations saved</h3>
      </div>
      <div v-if="locations.length > 0 && show">
        <p>Your last saved location is:</p>
        <p>Name : {{ lastLocation.fields.name }}</p>
        <p>Lat : {{ lastLocation.fields.lat }}</p>
        <p>Lng : {{ lastLocation.fields.lng }}</p>
        <p>Date visited : {{ lastLocation.fields.visit_date }}</p>
        <div style="height: 40vh" class="offset-md-3 col-md-6 col-sm-8">
          <l-map v-if="show" class="w-100" :zoom="zoom" :center="marker">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
          </l-map>
        </div>
      </div>
    </div>
    <GuestHome v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GuestHome from "./GuestHome.vue";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  components: { GuestHome, LMap, LTileLayer, LMarker },
  name: "Home",
  data() {
    return {
      zoom: 13,
      center: latLng(-3.56, -2.56),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(this.l),
      show: false,
      lastLocation: {},
    };
  },
  methods: {
    ...mapActions(["getLocations", "verifyToken"]),
  },
  computed: {
    ...mapGetters(["user", "locations"]),
    authenticated() {
      return localStorage.token;
    },
  },
  async created() {
    if (localStorage.token) {
      const user = await this.verifyToken(localStorage.token);
      await this.getLocations(user);
      this.lastLocation = this.locations.slice(-1)[0];
      const { fields } = this.lastLocation;
      this.marker = latLng(fields.lat, fields.lng);
      this.show = true;
    }
  },
};
</script>
