<template>
  <div class="answer">
      <div>
        <img :src="answer.image_url" >
      </div>
      <h6 class="text-secondary">User: {{ answer.answer_op }}</h6>
      <h6 class="text-secondary">Upvotes: {{answer.upvotes}}</h6>
      <h6 class="text-secondary">Downvotes: {{answer.downvotes}}</h6>
      <h6 class="text-secondary">Response: {{ answer.content }}</h6>
      <h6 class="text-secondary">Vote Count: {{ answer.vote_count }}</h6>
      <button class="'fas fa-arrow-up'" v-on:click.prevent="upvote()">+</button>
      <button v-on:click.prevent="downvote()">-</button>
      <router-link class="text-secondary" v-bind:to="'/answers/' + answer.id">Respond to this answer!</router-link>
      <div class="nested-answers">
        <answer v-for="nestedAnswer in answer.answers" :answer="nestedAnswer"></answer>
      </div>
    </div>
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
  methods: {
    upvote: function(){
      var clientParams = {
        answer_id: this.answer.id,
        positive: true
      };
      axios
      .post("/api/votes", clientParams)
      .then(response => {
        return axios.get("/api/answers/" + response.data.answer_id)
        .then(response => {
          this.answer = response.data;
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
        this.answer.vote_count - 1;
        // this.answer.votes.push(response.data);
      });
    },
  }
};
</script>



