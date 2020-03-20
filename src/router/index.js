import Vue from 'vue'
import VueRouter from 'vue-router'

import Signup from '../views/Signup.vue';
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import CategoriesIndex from '../views/CategoriesIndex'

import CategoriesAdviceIndex from '../views/CategoriesAdviceIndex.vue'
import CategoriesBetaRoomIndex from '../views/CategoriesBetaRoomIndex.vue'
import CategoriesGearRoomIndex from '../views/CategoriesGearRoomIndex.vue'
import CategoriesFeedbackIndex from '../views/CategoriesFeedbackIndex.vue'


import QuestionsNew from '../views/QuestionsNew.vue'
import QuestionsShow from '../views/QuestionsShow.vue'
import QuestionsEdit from '../views/QuestionsEdit.vue'

import AnswersShow from '../views/AnswersShow.vue'
import AnswersEdit from '../views/AnswersEdit.vue'

import QuestionsImageAnswerCreate from '../views/QuestionsImageAnswerCreate.vue'



Vue.use(VueRouter)

const routes = [
  {path: '/signup', name: 'signup', component: Signup},
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },

  { path: "/", name: "categories-index", component: CategoriesIndex },  

  
  {path: '/categories/advice', name: 'categories-advice-index', component: CategoriesAdviceIndex},
  {path: '/categories/beta_room', name: 'categories-beta-room-index', component: CategoriesBetaRoomIndex},
  {path: '/categories/gear_room', name: 'categories-gear-room-index', component: CategoriesGearRoomIndex},
  {path: '/categories/feedback', name: 'categories-feedback-index', component: CategoriesFeedbackIndex},


  {path: '/questions/new', name: 'questions-new', component: QuestionsNew},
  {path: '/questions/:id', name: 'questions-show', component: QuestionsShow},
  {path: '/questions/:id/edit', name: 'questions-edit', component: QuestionsEdit},


  {path: '/answers/:id', name: 'answers-show', component: AnswersShow},
  {path: '/answers/:id/edit', name: 'answers-edit', component: AnswersEdit},

  {path: '/questions/:id/image', name: 'image-answer-create', component: QuestionsImageAnswerCreate}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
