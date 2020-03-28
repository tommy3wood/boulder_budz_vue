import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import Editor from "vue-image-markup";
import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "localhost:3000" : "https://stark-inlet-24679.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
