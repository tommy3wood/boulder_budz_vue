<template>
  <div class="questions-index">
    <h1 class="text-center mb-5">{{question.title}}</h1>
      <h5>User: {{ question.op }}</h5>
      <h5>Category: {{ question.category }}</h5>
      <h5>Question Body: {{ question.content }}</h5>
      
      <div>
        <router-link v-bind:to="'/questions/' + question.id + '/edit'">Edit Question</router-link>
        <br>
        <button v-on:click="destroyQuestion()">Delete</button>
      </div>

      <h2>Answers</h2>
      <div v-for="answer in question.answers">
        <h5>User: {{ answer.user_id }}</h5>
        <h5>{{ answer.content }}</h5>
        <p>==============================</p>
      </div>

      <form v-on:submit.prevent="createQuestionAnswer()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <h5>Respond:</h5>
        <div class="form-group">
          <input type="text" v-model="content">
        </div>

        <input class="btn btn-info" type="submit" value="Respond">
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
        question: []
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
      createQuestionAnswer: function() {
        var clientParams = {
          user_id: 1,
          answerable_id: this.question.id,
          answerable_type: "Question",
          content: this.content
        };

        axios
          .post("/api/answers", clientParams)
          .then(response => {
            this.$router.push("/answers");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
      destroyQuestion: function() {
        axios
          .delete("/api/questions/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/questions");
          });
      }
    }
  };
</script>