<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    this.$parent.userEmail = "";
    localStorage.removeItem("userId");
    this.$parent.userId = "";

    this.$router.push("/");
  }
};
</script>