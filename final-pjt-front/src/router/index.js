import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import DetailView from '@/views/DetailView.vue'
import ShotView from '@/views/ShotView.vue'
import ShotCreateView from '@/views/ShotCreateView.vue'
import ShotUpdateView from '@/views/ShotUpdateView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound404 from '../views/NotFound404.vue'
import AdminView from '@/views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  /*
  accounts
    /login => LoginView
    /logout => LogoutView
    /signup => SignupView
    /profile/:username => ProfileView
  
  shots
    / => ShotListView
    /shots/new => ShotNewView
    /shots/:shotPk => ShotDetailView
    /shots/:shotPk/edit => ShotEditView
    /404 => NotFound404
    * => /404
  */
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie',
    name: 'movie',
    component: MovieView,
  },
  {
    path: '/detail/:movieId',
    name: 'detail',
    component: DetailView,
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/shot',
    name: 'shot',
    component: ShotView,
  },
  {
    path: '/shot/create',
    name: 'shotCreate',
    component: ShotCreateView,
  },
  {
    path: '/shot/update',
    name: 'shotUpdate',
    component: ShotUpdateView,
  },
  {
    path: '/admin',
    component: AdminView,
    beforeEnter(){
      window.location.href = "https://one-shot-api.link/admin/"
    }
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404,
  },
  {
    path: '*',
    redirect: '/404'
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 이전 페이지에서 발생한 에러메시지 삭제
  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters


  const noAuthPages = ['login', 'signup', 'home', 'shot', 'movie', 'detail', 'profile', 'NotFound404']

  const isAuthRequired = !noAuthPages.includes(to.name)

  // 로그인되어 있지 않고, 권한이 필요한 요청을 했다면
  if (isAuthRequired && !isLoggedIn) {
    alert('로그인이 필요합니다')
    next({ name: 'home' })
  } else {
    next()
  }

  // if (!isAuthRequired && isLoggedIn) {
  //   next()
  // }
})

/*
Navigation Guard 설정
  (이전 페이지에서 있던 에러 메시지 삭제)

  로그인(Authentication)이 필요 없는 route 이름들 저장(/login, /signup)

  0. router 에서 이동 감지

  1. 현재 이동하고자 하는 페이지가 로그인이 필요한지 확인
  
  2. 로그인이 필요한 페이지인데 로그인이 되어있지 않다면
    로그인 페이지(/login)로 이동

  3. 로그인이 되어 있다면
    원래 이동할 곳으로 이동
  
  4. 로그인이 되어있는데 /login, /signup 페이지로 이동한다면
    메인 페이지(/)로 이동
    

*/

export default router
