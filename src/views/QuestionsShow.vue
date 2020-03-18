<template>
  <div class="questions-index container">
      <div>
        <img :src="question.image_url" v-bind:alt="question.title">
      </div>
      <h1 class="text-secondary">Question</h1>
      <h3 class="text-secondary">{{question.title}}</h3>
      <h5 class="text-secondary">User: {{ question.op }}</h5>
      <h5 class="text-secondary">Category: {{ question.category }}</h5>
      <h5 class="text-secondary">Question Body: {{ question.content }}</h5>
      
      <div>
        <router-link v-bind:to="'/questions/' + question.id + '/edit'">Edit Question</router-link>
        <br>
        <button v-on:click="destroyQuestion()">Delete</button>
      </div>

      <h2 class="text-secondary">Answers</h2>

      <div class="first-level-answers">
        <h4 class="text-secondary">Answer Tree:</h4>
        <answer v-for="nestedAnswer in question.answers" :answer="nestedAnswer"></answer>
      </div>

      <form v-on:submit.prevent="createQuestionAnswer()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <h5 class="text-secondary">Respond:</h5>
        <div class="form-group">
          <input type="text" v-model="qa_content">
        </div>

        <input class="btn btn-info" type="submit" value="Respond">
      </form>
      <router-link v-bind:to="'/questions/' + question.id + '/image'">Image Edit</router-link>

  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");
  import Answer from '../components/Answer.vue';

  export default {
    data: function() {
      return {
        question: [],
        qa_content: "",
        errors: []
      };
    },
    components: {
      Answer
    },
    created: function() {
      axios
        .get("/api/questions/" + this.$route.params.id)
        .then(response => {
          this.question = response.data;
          console.log(this.question)
        });
    },
    methods: {
      createQuestionAnswer: function() {
        var clientParams = {
          answerable_id: this.question.id,
          answerable_type: "Question",
          content: this.qa_content
        };

        axios
          .post("/api/answers", clientParams)
          .then(response => {
            this.question.answers.push(response.data);
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