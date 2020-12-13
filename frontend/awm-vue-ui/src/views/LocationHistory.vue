<template>
  <div class="col-md-9 offset-md-2 my-4">
    <h1>Previously Visited</h1>

    <b-table
      id="locations-table"
      ref="locationsTable"
      :items="locations"
      :fields="locationTableFields"
      hover
      show-empty
      borderless
      striped
      responsive
    >
      <template v-slot:cell(name)="data">
        {{ data.item.fields.name }}
      </template>
      <template v-slot:cell(lat)="data">
        {{ data.item.fields.lat }}
      </template>
      <template v-slot:cell(lng)="data">
        {{ data.item.fields.lng }}
      </template>
      <template v-slot:cell(date)="data">
        {{ data.item.fields.visit_date }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LocationHistory",
  components: {},
  data() {
    return {
      locationTableFields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "lat",
          label: "Latitude",
        },
        {
          key: "lng",
          label: "Longitude",
        },
        {
          key: "date",
          label: "Date Visited",
        },
        { key: "_rowActions", label: "", class: "table__actions-field" },
      ],
    };
  },
  methods: {
    ...mapActions(["getLocations", "addLocation", "removeLocation"]),
  },
  computed: mapGetters(["locations"]),
  async created() {
    await this.getLocations(this.$route.params.user);
  },
};
</script>
