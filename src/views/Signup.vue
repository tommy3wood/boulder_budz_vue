<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1 class="text-center mb-5">Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input 
            type="password" 
            class="form-control" 
            :class="{
                    'is-invalid': passwordConfirmation !== '' && password !== passwordConfirmation, 
                    'is-valid': passwordConfirmation !== '' && password === passwordConfirmation
                    }" 
            v-model="passwordConfirmation"
          >
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="phone" class="form-control" v-model="phone">
        </div>

        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="bio">
        </div>

        <div class="form-group">
          <label>Home Crag:</label>
          <input type="home_crag" class="form-control" v-model="home_crag">
        </div>

        <div class="form-group">
          <label>Location:</label>
          <input type="location" class="form-control" v-model="location">
        </div>

        <input type="submit" class="btn btn-primary" value="Submit">
      </form>      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "password",
      passwordConfirmation: "password",
      phone: "",
      bio: "",
      home_crag: "",
      location: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        phone: this.phone,
        bio: this.bio,
        home_crag: this.home_crag,
        location: this.location
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>