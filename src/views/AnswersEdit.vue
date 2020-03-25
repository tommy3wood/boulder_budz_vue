<template>
  <div class="questions-edit container">
    
      <form v-on:submit.prevent="updateAnswer()">
        <h1 class="text-center mb-5">Edit Answer</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Answer: </label>
          <input class="form-control" type="text" v-model="answer.content">
        </div>

        <input class="btn btn-info" type="submit" value="Update">
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
        answer: {
          op: "",
          content: ""
        },
        errors: []
      };
    },
    created: function() {
      axios
        .get("/api/answers/" + this.$route.params.id)
        .then(response => {
          this.answer = response.data;
        });
    },
    methods: {
      updateAnswer: function() {
        var clientParams = {
          content: this.answer.content
        };

        axios
          .patch("/api/answers/" + this.$route.params.id, clientParams)
          .then(response => {
            this.$router.push("/answers/" + this.$route.params.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>