<template>
  <div class="home">
    <h2>Current and Past Locations</h2>
    <div style="height: 70vh" class="col-md-10 offset-md-1">
      <l-map v-if="show" class="w-100" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-circle :lat-lng="center" :radius="1000" color="blue" />
        <l-marker :lat-lng="center">
          <l-popup
            >Lat:<strong>{{ location.lat }}<br /></strong> Lng:<strong>{{
              location.lng
            }}</strong
            ><br />
            <b-button
              class="mt-2"
              variant="primary"
              v-b-modal.modal-prevent-closing
              >Save Location</b-button
            ></l-popup
          >
        </l-marker>
        <l-marker
          v-for="({ fields }, index) in locations"
          :key="index"
          :lat-lng="[fields.lat, fields.lng]"
        >
          <l-popup v-if="!sameAsCurrentLocation(fields.lat, fields.lng)"
            ><strong>{{ fields.name }}</strong>
            <p>User:{{ fields.user }}</p>
            <p>Visited on: {{ fields.visit_date }}</p>
            Lat:<strong>{{ fields.lat }}<br /></strong> Lng:<strong>{{
              fields.lng
            }}</strong
            ><br />
          </l-popup>
          <l-popup v-else
            >Lat:<strong>{{ location.lat }}<br /></strong> Lng:<strong>{{
              location.lng
            }}</strong
            ><br />
            <b-button
              class="mt-2"
              variant="primary"
              v-b-modal.modal-prevent-closing
              >Save Location</b-button
            ></l-popup
          >
        </l-marker>
      </l-map>
      <b-spinner v-else></b-spinner>
    </div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Save Location"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "vue2-leaflet";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LCircle,
  },
  data() {
    return {
      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      location: { lat: null, lng: null },
      center: null,
      show: false,
      name: null,
    };
  },
  methods: {
    ...mapActions(["addLocation", "getLocations"]),
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.saveLocation();
    },
    sameAsCurrentLocation(lat, lng) {
      if (lat == this.location.lat && lng == this.location.lng) return true;
      return false;
    },
    resetModal() {
      this.name = "";
    },
    async saveLocation() {
      await this.addLocation({
        user: this.$route.params.user,
        location: {
          name: this.name,
          lat: this.location.lat,
          lng: this.location.lng,
        },
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    getLocation() {
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.center = latLng(pos.coords.latitude, pos.coords.longitude);
          this.location.lat = pos.coords.latitude;
          this.location.lng = pos.coords.longitude;
          this.show = true;
        },
        (err) => {
          this.show = false;
          console.log(err.message);
        }
      );
    },
  },
  async created() {
    await this.getLocations(this.$route.params.user);
  },
  mounted() {
    this.getLocation();
  },
  updated() {
    this.getLocation();
  },
  computed: mapGetters(["locations"]),
};
</script>
