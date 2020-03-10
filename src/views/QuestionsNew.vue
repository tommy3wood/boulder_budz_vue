<template>
  <div class="questions-new">
    <div class="row">
      <form class="col-sm-6" v-on:submit.prevent="createQuestion()">
        <h1 class="text-center mb-5">New Question</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Title: </label>
          <input class="form-control" type="text" v-model="title">
        </div>

        <div class="form-group">
          <label>Prep Time: </label>
          <input class="form-control" type="number" v-model="prepTime">
        </div>

        <div class="form-group">
          <label>Ingredients: </label>
          <input class="form-control" type="text" v-model="ingredients">
        </div>

        <div class="form-group">
          <label>Directions: </label>
          <input class="form-control" type="text" v-model="directions">
        </div>

        <div class="form-group">
          <label>Image Url: </label>
          <input class="form-control" type="text" v-model="imageUrl">
        </div>

        <input class="btn btn-info" type="submit" value="Create">
      </form>

    </div>
  </div>
</template>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        title: "",
        prepTime: "",
        ingredients: "",
        directions: "",
        imageUrl: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      createQuestion: function() {
        var clientParams = {
          title: this.title,
          prep_time: this.prepTime,
          ingredients: this.ingredients,
          directions: this.directions,
          image_url: this.imageUrl
        };

        axios
          .post("/api/questions", clientParams)
          .then(response => {
            this.$router.push("/questions");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>