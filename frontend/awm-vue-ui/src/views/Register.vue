<template>
  <div class="col-lg-6 offset-lg-3">
    <b-form
      @submit="onSubmit"
      @reset="onReset"
      v-if="show"
      class="mt-4 text-left"
    >
      <b-form-group label="Username*">
        <b-form-input
          v-model="form.username"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email address*">
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password*">
        <b-form-input
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password Confirmation*">
        <b-form-input
          v-model="passwordConfirm"
          type="password"
          required
          placeholder="Enter password again"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100"
        >Register</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
      passwordConfirm: "",
      passConfirmed: false,
      show: true,
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        await this.signUp(this.form);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.username = "";
      this.form.password = "";
      this.passwordConfirm = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
