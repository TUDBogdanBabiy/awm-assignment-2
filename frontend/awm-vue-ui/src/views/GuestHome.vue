<template>
  <div class="col-md-6 offset-md-3 my-4">
    <h4><router-link to="/login">Log In</router-link></h4>
    <b-row align-h="center"
      ><b-col cols="3"><hr /></b-col>
      <b-col cols="3">or</b-col>
      <b-col cols="3"><hr /></b-col
    ></b-row>
    <h4><router-link to="/register">Sign Up</router-link></h4>
  </div>
</template>

<script>
export default {
  name: "GuestHome",
  components: {}
};
</script>
