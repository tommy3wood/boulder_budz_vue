<template>
  <div class="answers-index">
      <h5>User: {{ answer.op }}</h5>
      <h5>Answer: {{ answer.content }}</h5>
      <router-link v-bind:to="answer.parent_route">Parent</router-link>
      <div>
        <router-link v-bind:to="'/answers/' + answer.id + '/edit'">Edit Answer</router-link>
        <br>
        <button v-on:click="destroyAnswer()">Delete</button>
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
        answer: []
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
      destroyAnswer: function() {
        axios
          .delete("/api/answers/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/answers");
          });
      }
    }
  };
</script>