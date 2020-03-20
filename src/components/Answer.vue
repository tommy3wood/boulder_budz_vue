<template>
  <div class="answer">
      <div>
        <img :src="updateAnswer.image_url" >
      </div>
      <h6 class="text-secondary">User: {{ updateAnswer.answer_op }}</h6>
      <h6 class="text-secondary">Upvotes: {{updateAnswer.upvotes}}</h6>
      <h6 class="text-secondary">Downvotes: {{updateAnswer.downvotes}}</h6>
      <h6 class="text-secondary">Response: {{ updateAnswer.content }}</h6>
      <h6 class="text-secondary">Vote Count: {{ updateAnswer.vote_count }}</h6>
      <button class="'fas fa-arrow-up'" v-on:click.prevent="upvote()">+</button>
      <button v-on:click.prevent="downvote()">-</button>
      <router-link class="text-secondary" v-bind:to="'/answers/' + updateAnswer.id">Respond to this answer!</router-link>
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
  }
};
</script>



