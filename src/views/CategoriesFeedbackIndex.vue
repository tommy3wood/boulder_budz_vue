<template>
  <div class="questions-feedback-index container">
    <h1 class="text-center mt-5 mb-5 feedback-header">FEEDBACK</h1>
    <div  v-for="question in feedbackQuestions(questions)" class="blog-list-box border-gradient-reg mb-30">
      <div class="blog-head">
        <div class="index-img">
          <img :src="question.image_url" alt="blog-featured-img">
        </div>
        <!-- :src="question.image_url" -->
      </div>
      <div class="blog-content">
        <div class="blog-content-body">
          <router-link v-bind:to="'/questions/' + question.id"> 
            <h3 class="blog-title mb-20 question-title">
              {{ question.title }}
            </h3>
          </router-link>
          <div class="blog-footer">
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0 blog-views"><span class="text-dim"><i class="mdi mdi-account-outline"></i>User: {{ question.op }}</span></p>
              </div>
              <div class="col-sm-4">
              <p class="mb-0 blog-views"> <span class="text-dim"><i class="mdi mdi-calendar-clock"></i> Created: {{ relativeDate(question.created_at) }}</span></p>
              </div>
            </div>  
          </div>
        </div>
      </div> 
    </div>   
  </div>
</template>

<style>
.feedback-header {
  color: #fff;
  text-shadow: 2px 2px #02d9ff;
}
.question-title {
  color: #02d9ff;
  text-decoration: underline;
}
</style>

<script>
  var axios = require("axios");
  var _ = require('lodash');
  import moment from "moment";

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
      feedbackQuestions: function(questions) {
        return questions.filter(function(question){
          return question.category === "app_feedback";
        });
      },
      sortQuestions(questionsArray) {
        return _.orderBy(questionsArray, 'created_at', 'desc')
      },
      relativeDate: function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
  };
</script>