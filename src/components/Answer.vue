<template>
  <div class="answer">
      <div>
        <img :src="answer.image_url" >
      </div>
      <h6>User: {{ answer.answer_op }}</h6>
      <h6>Response: {{ answer.content }}</h6>
      <router-link v-bind:to="'/answers/' + answer.id">Respond to this answer!</router-link>
      <div class="nested-answers">
        <answer v-for="nestedAnswer in answer.answers" :answer="nestedAnswer"></answer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "answer",
  props: {
    answer: {
      answers: []
    }
  }
};
</script>



