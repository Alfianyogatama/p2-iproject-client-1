import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Conversation from '../views/Conversation.vue'
import Inbox from '../components/Inbox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/chatbox/:id',
    name: 'Chat',
    component: Inbox
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    component: Conversation
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*router.beforeEach((to, from, next) => {
  let access_token = localStorage.access_token
  
  switch (to.name){
    case "Home":
    if (access_token) {next()}
      else next('/login')
  }

})*/

export default router
