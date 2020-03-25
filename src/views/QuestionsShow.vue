<template>
  <div class="questions-index container">
    <div v-if="question.category === 'advice'" class="blog-details-box border-gradient-info mb-30">
    
      <div class="blog-head mt-5">
        <img :src="question.image_url" v-bind:alt="question.title">
      </div>
      <div class="blog-content">
        <div class="blog-content-head">
          <div class="row">
            <div class="col-sm-7">
              <div class="blog-content-cate">
                <ul class="list-inline">
                  <li class="list-inline"><a href="/Categories/advice" class="btn-gradient-cate-info">{{ question.category }}</a></li>
                </ul>
              </div>
              <div class="col-sm-5 text-align:left">
                <div class="blog-content-date">
                  <p>{{relativeDate(question.created_at)}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="blog-content-body">
            <h2 class="blog-title mb-20">{{question.title}}</h2>
            <router-link v-bind:to="'/users/' + question.user_id"><h6>{{question.op}}</h6></router-link>
            
            <p class="text-white">{{question.content}}</p>
            <div v-if="this.$parent.userEmail === question.op">
              <router-link class="btn mb-2" v-bind:to="'/questions/' + question.id + '/edit'">Edit Question</router-link>
              <br>
              <button class="btn danger" v-on:click="destroyQuestion()">Delete</button>
            </div>

            <blockquote class="blockquote m-5">
              <h1>Respond to this post:</h1>
              <form v-on:submit.prevent="createQuestionAnswer()">
                <ul>
                  <li class="text-danger" v-for="error in errors">{{ error }}</li>
                </ul>
                
                <div class="form-group">
                  <label class="text-dim mr-2">Text Response:</label>
                  <input type="text" v-model="qa_content">
                </div>

                <input class="btn btn-pri mb-1 mt-1" type="submit" value="Respond">
              </form>
              <router-link class="btn btn-pri mb-1 mt-1" v-bind:to="'/questions/' + question.id + '/image'">Image Response</router-link>
            </blockquote>
          </div>
        </div>
      </div>

    </div>
    <div class="first-level-answers comment-box border-gradient-info mb-30">
      <div class="comment-title">
        <h2>Answers</h2>
      </div>
      <div class="comment-list">
        <answer v-for="nestedAnswer in question.answers" :answer="nestedAnswer"></answer>
      </div>  
    </div>
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");
  import Answer from '../components/Answer.vue';
  import moment from "moment";

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
            this.qa_content = "";
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
      },
      relativeDate: function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm a');
      }
    }
  };
</script>