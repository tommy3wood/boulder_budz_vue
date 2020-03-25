<template>
  <div class="answers-index container">
    <div class="blog-details-box border-gradient-info mt-30 mb-30">
      <div v-if="answer.image" class="blog-head mt-5">
        <img :src="answer.image_url">
      </div>
      <div class="blog-content">
        <div class="blog-content-head">
          <div class="row">
            <div class="col-sm-7">
              <div class="col-sm-5">
                <div class="blog-content-date">
                  <p>{{answer.created_at}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="blog-content-body">
            <h2 class="blog-title mb-20">
              REPLYING TO:
            </h2>
            <h4>
              <label class="mr-3">User:</label>
              {{answer.answer_op}}
            </h4>
            <h5>
              <router-link v-bind:to="answer.parent_route">Reply Context</router-link>
            </h5>
            <p class="text-dim">{{answer.content}}</p>

            <blockquote class="blockquote m-5">
              <h4>Reply to Post</h4>
              <form v-on:submit.prevent="createAnswer()">
                <ul>
                  <li class="text-danger" v-for="error in errors">{{ error }}</li>
                </ul>

                <div class="form-group">
                  <textarea v-model="content_aa" id="message" name="message" cols="45" rows="5" class="form-control" placeholder="Enter Your Reply..."></textarea>
                </div>

                <input class="btn btn-info mb-5" type="submit" value="Respond">
              </form>
            </blockquote>
          </div>
        </div>
      </div>
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