<template>
  <div class="user-edit container">  
    <h1 class="text-secondary">{{user.email}}</h1>
    <form v-on:submit.prevent="updateUser()">
      <h3 class="text-secondary">Edit Profile</h3>
      <ul>
        <li class="text-danger" v-for="error in errors">{{error}}</li>
      </ul>

      <div>
        <label>Phone: </label>
        <input type="text" v-model="user.phone">
      </div>

      <div>
        <label>Bio: </label>
        <input type="text" v-model="user.bio">
      </div>

      <div>
        <label>Home Crag: </label>
        <input type="text" v-model="user.home_crag">
      </div>

      <div>
        <label>Location: </label>
        <input type="text" v-model="user.location">
      </div>

      <input class="btn btn-info" type="submit" name="Update">
    </form>

  </div>

</template>

<script>
  var axios = require("axios");

export default {
  data: function() {
    return {
      user: [],
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/users/" + this.$parent.userId)
      .then(response => {
        this.user = response.data;
      });
  },
  methods: {
    updateUser: function() {
      var clientParams = {
        phone: this.user.phone,
        bio: this.user.bio,
        home_crag: this.user.home_crag,
        location: this.user.location
      };
      axios
        .patch("/api/users/" + this.$parent.userId, clientParams)
        .then(response => {
          this.$router.push("/users/" + this.$route.params.id);
        }).catch(error => {
            this.errors = error.response.data.errors;
        });
    }
  }
}
</script>