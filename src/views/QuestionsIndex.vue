<template>
  <div class="questions-index">
    <h1 class="text-center mb-5">QUESTIONS</h1>

    <div v-for="question in questions">
      <h5>User: {{ question.op }}</h5>
      <h5>Category: {{ question.category }}</h5>
      <h5>Question: {{ question.title }}</h5>
      <h5>Question Body: {{ question.content }}</h5>
    </div>   
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

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
    methods: {}
  };
</script>