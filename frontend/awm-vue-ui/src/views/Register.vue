<template>
  <div class="col-lg-6 offset-lg-3">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-4">
      <b-form-group label="Username*">
        <b-form-input
          v-model="form.name"
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
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
      passwordConfirm: "",
      passConfirmed: false,
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
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
