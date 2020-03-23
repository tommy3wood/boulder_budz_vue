<template>
  <div class="user-show container">  
    <h1 class="text-secondary">{{user.email}}</h1>
    <h1 class="text-secondary">{{user.phone}}</h1>
    <h1 class="text-secondary">{{user.bio}}</h1>
    <h1 class="text-secondary">{{user.home_crag}}</h1>
    <h1 class="text-secondary">{{user.location}}</h1>
    <br>
    <h1 class="text-secondary">User Questions</h1>
    <div v-for="question in user.user_questions">
      <router-link v-bind:to="'/questions/' + question.id"> 
        <h3 class="text-secondary">{{ question.title }}</h3>
      </router-link>
      <h5 class="text-secondary">Category: {{ question.category }}</h5>
      <p>===================================================================================================================</p>
    </div>
    <h1 class="text-secondary">User Answers</h1>
    <div v-for="answer in user.user_answers">
      <router-link v-bind:to="'/asnwers/' + answer.id"> 
        <h3 class="text-secondary">{{ answer.content }}</h3>
      </router-link>
      <p>===================================================================================================================</p>
    </div>
    <router-link class="btn btn-primary" v-bind:to="'/users/' + this.$parent.userId + '/edit'">Edit Profile</router-link>
  </div>

</template>

<script>
  var axios = require("axios");

export default {
  data: function() {
    return {
      user: []
    };
  },
  created: function() {
    axios
      .get("/api/users/" + this.$parent.userId)
      .then(response => {
        this.user = response.data;
        console.log(this.user);
      });
  },
}
</script>