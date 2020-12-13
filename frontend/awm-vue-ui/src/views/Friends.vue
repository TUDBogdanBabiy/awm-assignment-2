<template>
  <div class="col-md-6 offset-md-3 my-4">
    <h1>Friends</h1>
    <p>
      You have <strong>{{ friends.length }}</strong> friends!
    </p>
    <b-table
      id="friends-table"
      ref="friendsTable"
      :items="friends"
      :fields="friendsTableFields"
      hover
      show-empty
      borderless
      striped
      responsive
    >
      <template v-slot:cell(name)="data">
        {{ data.item.fields.name }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Friends",
  data() {
    return {
      friendsTableFields: [
        {
          key: "name",
          label: "Name",
        },
        { key: "_rowActions", label: "", class: "table__actions-field" },
      ],
    };
  },
  methods: {
    ...mapActions(["getFriends", "addFriend", "removeFriend"]),
  },
  computed: { ...mapGetters(["friends"]) },
  async created() {
    await this.getFriends(this.$route.params.user);
  },
};
</script>
