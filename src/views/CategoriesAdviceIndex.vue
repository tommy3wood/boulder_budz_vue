<template>
  <div class="questions-advice-index">
    <h1 class="text-secondary text-center mb-5">Advice</h1>
    <p>===================================================================================================================</p>

    <div  v-for="question in adviceQuestions(questions)">
      <router-link v-bind:to="'/questions/' + question.id"> 
        <h3 class="text-secondary">
          {{ question.title }}
        </h3>
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
      adviceQuestions: function(questions) {
        return questions.filter(function(question){
          return question.category === "advice";
        });
      },
      sortQuestions(questionsArray) {
        return _.orderBy(questionsArray, 'created_at', 'desc')
      }
    }
  };
</script>