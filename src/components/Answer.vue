<template>
  <div class="answer comment-list">
    <ol class="media-list list-unstyled">
      <li class="comment even depth-1">
        <div class="media">
          <div class="row">            
              <div class="col-sm-1" style="font-size: 30px; color:#606060; text-align: center;">
                  <span v-on:click.prevent="upvote()" class="mdi mdi-arrow-up-bold-circle-outline col-md-12"></span>
                  <span class="col-md-12">{{ updateAnswer.vote_count }}</span>
                  <span v-on:click.prevent="downvote()" class="mdi mdi-arrow-down-bold-circle-outline col-md-12"></span>
              </div>
          </div>
          <div class="media-body">
            <img v-if="updateAnswer.image_url" :src="updateAnswer.image_url" height="150" width="150">
            <router-link v-bind:to="'/users/'+ updateAnswer.user_id">
              <h5 class="media-heading">{{ updateAnswer.answer_op }}</h5>
            </router-link>
            
            <p class="text-white">{{ updateAnswer.created_at }}</p>
            <p class="text-white">{{ updateAnswer.content }}</p>
            <router-link rel="nofollow" class="comment-reply-link text-dim mb-5" v-bind:to="'/answers/' + updateAnswer.id"><i class="mdi mdi-reply mr5"></i> Reply!</router-link>
            <answer v-for="nestedAnswer in answer.answers" :answer="nestedAnswer"></answer>   
            
          </div>
        </div>
      </li>          
    </ol>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  name: "answer",
  props: {
    answer: {
      answers: []
    }
  },
  data: function(){
    return {
      updateAnswer: {
        id: this.answer.id,
        image_url: this.answer.image_url,
        answer_op: this.answer.answer_op,
        upvotes: this.answer.upvotes,
        downvotes: this.answer.downvotes,
        content: this.answer.content,
        vote_count: this.answer.vote_count
      }
    };
  },
  methods: {
    upvote: function(){
      var clientParams = {
        answer_id: this.answer.id,
        positive: true
      };
      axios
      .post("/api/votes", clientParams)
      .then(response => {
        console.log(response.data)
        return axios.get("/api/answers/" + response.data.answer_id)
        .then(response => {
          console.log(response.data)
          this.updateAnswer = response.data;
        })
      });
    },
    downvote: function(){
      var clientParams = {
        answer_id: this.answer.id,
        positive: false
      };
      axios
      .post("/api/votes", clientParams)
      .then(response => {
        return axios.get("/api/answers/" + response.data.answer_id)
        .then(response => {
          this.updateAnswer = response.data;
        })
      });
    },
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm a');
    }
  }
};
</script>



