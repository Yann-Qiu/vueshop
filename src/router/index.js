import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import UserView from '../views/UserView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: WelcomeView
      },
      {
        path: '/users',
        component: UserView
      }
    ]

  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  else {
    const token = window.sessionStorage.getItem('token')
    if (token) { next() } else { next('/login') }
  }
})

export default router
