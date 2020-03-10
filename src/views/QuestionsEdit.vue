<template>
  <div class="questions-edit">
    
      <form v-on:submit.prevent="updateQuestion()">
        <h1 class="text-center mb-5">New Question</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <span>Category: </span>
          <select v-model="question.category">
            <option disabled value="">Please select one</option>
            <option value="advice">advice</option>
            <option value="beta_room">Beta Room</option>
            <option value="gear_room">Gear Room</option>
            <option value="app_feedback">Feedback</option>
          </select>
        </div>

        <div class="form-group">
          <label>Question Title: </label>
          <input class="form-control" type="text" v-model="question.title">
        </div>

        <div class="form-group">
          <label>Question Body: </label>
          <input class="form-control" type="text" v-model="question.content">
        </div>

        <input class="btn btn-info" type="submit" value="Create">
      </form>

   
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        question: {
          category: "",
          title: "",
          content: ""
        },
        errors: []
      };
    },
    created: function() {
      axios
        .get("/api/questions/" + this.$route.params.id)
        .then(response => {
          this.question = response.data;
        });
    },
    methods: {
      updateQuestion: function() {
        var clientParams = {
          category: this.question.category,
          title: this.question.title,
          content: this.question.content
        };

        axios
          .patch("/api/questions/" + this.$route.params.id, clientParams)
          .then(response => {
            this.$router.push("/questions/" + this.$route.params.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>