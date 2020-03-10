import Vue from 'vue'
import VueRouter from 'vue-router'

import Signup from '../views/Signup.vue';

import QuestionsIndex from '../views/QuestionsIndex.vue'
import QuestionsNew from '../views/QuestionsNew.vue'
import QuestionsShow from '../views/QuestionsShow.vue'
import QuestionsEdit from '../views/QuestionsEdit.vue'

import AnswersIndex from '../views/AnswersIndex.vue'
import AnswersNew from '../views/AnswersNew.vue'
import AnswersShow from '../views/AnswersShow.vue'
import AnswersEdit from '../views/AnswersEdit.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/signup', name: 'signup', component: Signup},

  {path: '/questions', name: 'questions-index', component: QuestionsIndex},
  {path: '/questions/new', name: 'questions-new', component: QuestionsNew},
  {path: '/questions/:id', name: 'questions-show', component: QuestionsShow},
  {path: '/questions/:id/edit', name: 'questions-edit', component: QuestionsEdit},

  {path: '/answers', name: 'answers-index', component: AnswersIndex},
  {path: '/answers/new', name: 'answers-new', component: AnswersNew},
  {path: '/answers/:id', name: 'answers-show', component: AnswersShow},
  {path: '/answers/:id/edit', name: 'answers-edit', component: AnswersEdit}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
