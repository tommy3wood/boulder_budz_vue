<template>
  <div class="answers-new">
    
      <form v-on:submit.prevent="createQuestionAnswer()">

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <input type="text" v-model="content">
        </div>

        <input class="btn btn-info" type="submit" value="Create">
      </form>

   
  </div>
</template>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        user_id: 1,
        answerable_id: "",
        answerable_type: "",
        content: "",

        errors: []
      };
    },
    created: function() {},
    methods: {
      createQuestionAnswer: function() {
        var clientParams = {
          answerable_id: 1,
          answerable_type: "Question",
          content: this.content
        };

        axios
          .post("/api/answers", clientParams)
          .then(response => {
            this.$router.push("/answers");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
    }
  };
</script>