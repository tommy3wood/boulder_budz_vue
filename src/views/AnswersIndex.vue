<template>
  <div class="answers-index">
    <h1 class="text-center mb-5">ANSWERS</h1>
    <p>===================================================================================================================</p>

    <div v-for="answer in answers">
   <!--    <router-link v-bind:to="'/questions/' + question.id"> 
        <h3 >{{ question.title }}</h3>
      </router-link> -->
      <h1></h1>
      <h5>User: {{ answer.answer_op }}</h5>
      <h5>Answer: {{ answer.content }}</h5>
      <router-link v-bind:to="'/answers/' + answer.id">View Comment</router-link>
      <p>===================================================================================================================</p>
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
        answers: []
      };
    },
    created: function() {
      axios
        .get("/api/answers")
        .then(response => {
          this.answers = response.data;
        });
    },
    methods: {}
  };
</script>