import Vue from 'vue'
import VueRouter from 'vue-router'

import Signup from '../views/Signup.vue';

import QuestionsIndex from '../views/QuestionsIndex.vue'
import QuestionsNew from '../views/QuestionsNew.vue'
import QuestionsShow from '../views/QuestionsShow.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/signup', name: 'signup', component: Signup},

  {path: '/questions', name: 'questions-index', component: QuestionsIndex},
  {path: '/questions/new', name: 'questions-new', component: QuestionsNew},
  {path: '/questions/:id', name: 'questions-show', component: QuestionsShow}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
