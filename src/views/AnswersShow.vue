<template>
  <div class="answers-index">
      <h5 class="text-secondary">User: {{ answer.answer_op }}</h5>
      <h5 class="text-secondary">Answer: {{ answer.content }}</h5>
      <router-link v-bind:to="answer.parent_route">Answer Context</router-link>
      <div v-if="this.$parent.userEmail === answer.answer_op">
        <router-link v-bind:to="'/answers/' + answer.id + '/edit'">Edit Answer</router-link>
        <br>
        <button v-on:click="destroyAnswer()">Delete</button>
      </div>
      <form v-on:submit.prevent="createAnswer()">

        <h5 class="text-secondary">Reply to answer</h5>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <input type="text" v-model="content_aa">
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
        answer: [],
        errors: [],
        content_aa: ""
      };
    },
    created: function() {
      axios
        .get("/api/answers/" + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.answer = response.data;
        });
    },
    methods: {
      createAnswer: function() {
        var clientParams = {
          answerable_id: this.answer.id,
          answerable_type: "Answer",
          content: this.content_aa
        };

        axios
          .post("/api/answers", clientParams)
          .then(response => {
            this.$router.push("/");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
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