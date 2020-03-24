<template>
  <div class="questions-new container">
    
      <form v-on:submit.prevent="createQuestion()">
        <h1 class="text-center mt-5 mb-5">New Question</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label class="mr-2">Category: </label>
          <select v-model="category">
            <option disabled value="">Please select one</option>
            <option value="advice">advice</option>
            <option value="beta_room">Beta Room</option>
            <option value="gear_room">Gear Room</option>
            <option value="app_feedback">Feedback</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label>Question Title: </label>
          <input class="form-control" type="text" v-model="title">
        </div>

        <div class="form-group">
          <label>Question Body: </label>
          <input class="form-control" type="text" v-model="content">
        </div>

        <div>
          <label class="mr-2">Picture: </label>
          <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>

        <input class="btn btn-info mb-5 mt-5" type="submit" value="Create">
      </form>

   
  </div>
</template>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        category: "",
        title: "",
        content: "",
        image: null,
        errors: []
      };
    },
    created: function() {},
    methods: {
      setFile: function(event) {
        if (event.target.files.length > 0) {
          this.image = event.target.files[0];
        }
      },

      createQuestion: function() {
        var formData = new FormData();
          formData.append("category", this.category);
          formData.append("title", this.title);
          formData.append("content", this.content);
          formData.append("image", this.image);
          console.log(formData);
        axios
          .post("/api/questions", formData)
          .then(response => {
            this.$router.push("/categories/" + this.category);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>