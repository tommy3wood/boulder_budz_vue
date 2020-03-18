<template>
  <div class="questions-index">
    <h1 class="text-secondary text-center mb-5">QUESTIONS</h1>
    <p>===================================================================================================================</p>

    <div  v-for="question in sortQuestions(questions)">
      <router-link v-bind:to="'/questions/' + question.id"> 
        <h3 class="text-secondary">{{ question.title }}</h3>
      </router-link>
      <h5 class="text-secondary">User: {{ question.op }}</h5>
      <h5 class="text-secondary">Category: {{ question.category }}</h5>
      <p>===================================================================================================================</p>
    </div>   
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");
  var _ = require('lodash');

  export default {
    data: function() {
      return {
        questions: []
      };
    },
    created: function() {
      axios
        .get("/api/questions")
        .then(response => {
          this.questions = response.data;
        });
    },
    methods: {
      sortQuestions(questionsArray) {
        return _.orderBy(questionsArray, 'created_at', 'desc')
      }
    }
  };
</script>