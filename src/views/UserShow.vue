<template>
  <div class="user-show container">  
    <div class="blog-details-box border-gradient-info mt-30 mb-30">
      <div class="blog-content">
        <div class="blog-content-head">
          <div class="blog-content-body">
            <h2 class="blog-title mb-20">
              User Profile
            </h2>
            <h1>{{user.email}}</h1>
            <p class="text-white">
              <label class="mr-3">Phone:</label>
              {{user.phone}}
            </p>
            <p class="text-white">
              <label class="mr-3">Bio:</label>
              {{user.bio}}
            </p>
            <p class="text-white">
              <label class="mr-3">Home Crag:</label>
              {{user.home_crag}}
            </p>
            <p class="text-white">
              <label class="mr-3">Location:</label>
              {{user.location}}
            </p>

            <router-link v-if="this.$parent.userEmail === user.email" class="btn" v-bind:to="'/users/' + this.$parent.userId + '/edit'">Edit Profile</router-link>

            <div class="user-questions">
              <h4 class="text-center">User Posts</h4>
              <div v-for="question in user.user_questions">
                <blockquote class="blockquote m-5">
                  <p class="text-white">
                    <label class="mr-3">Post Title</label>
                    <router-link v-bind:to="'/questions/' + question.id">
                    {{question.title}}
                  </router-link>
                  </p>
                  <p class="text-white">
                    <label class="mr-3">Post Date</label>
                    {{relativeDate(question.created_at)}}
                  </p>
                  <p class="text-white">
                    <label class="mr-3">Post Content</label>
                    {{question.content}}
                  </p>
                </blockquote>
              </div>
            </div>

            <div class="user-answers">
              <h4 class="text-center">User Replies</h4>
              <div v-for="answer in user.user_answers">
                <blockquote class="blockquote m-5">
                  <p class="text-white">
                    <router-link v-bind:to="answer.parent_route"><label>Reply Context</label></router-link>
                  </p>
                  <p class="text-white">
                    <label class="mr-3">Post Date</label>
                    {{relativeDate(answer.created_at)}}
                  </p>
                  <p class="text-white">
                    <label class="mr-3">Post Content</label>
                    {{answer.content}}
                  </p>
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  var axios = require("axios");
  import moment from "moment";

export default {
  data: function() {
    return {
      user: []
    };
  },
  created: function() {
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data;
        console.log(this.user);
      });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm a');
    }
  }
}
</script>