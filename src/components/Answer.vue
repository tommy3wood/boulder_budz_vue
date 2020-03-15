<template>
  <div class="answer">
      <div>
        <img :src="answer.image_url" >
      </div>
      <h6>User: {{ answer.answer_op }}</h6>
      <h6>Upvotes: {{answer.upvotes}}</h6>
      <h6>Downvotes: {{answer.downvotes}}</h6>
      <h6>Response: {{ answer.content }}</h6>
      <h6>Vote Count: {{ answer.vote_count }}</h6>
      <button v-on:click="upvote()">+</button>
      <button v-on:click="downvote()">-</button>
      <router-link v-bind:to="'/answers/' + answer.id">Respond to this answer!</router-link>
      <div class="nested-answers">
        <answer v-for="nestedAnswer in answer.answers" :answer="nestedAnswer"></answer>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {
  name: "answer",
  props: {
    answer: {
      answers: []
    }
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
        this.answer.votes.push(response.data);
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
        this.answer.votes.push(response.data);
      });
    },
  }
};
</script>



