import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'


export default {

  state: {
    token: localStorage.getItem('token') || '' ,
    currentUser: {},
    profile: {},
    isFollow: false,
    authError: null,
    likeShots: [],
    userShots: [],
    likeMovies: [],
    accountPage: '',
  },
  // 모든 state는 getters 를 통해서 접근하겠다.
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    
    profile: state => state.profile,
    profileId: state => state.profile?.id,
    userShots: state => state.userShots,
    likeShots: state => state.likeShots,
    likeMovies: state => state.likeMovies,

    isFollow: state => state.isFollow,
    followings: state => state.profile?.followers,
    followings_cnt: state => state.profile?.followings_cnt,
    followers: state => state.profile?.followers,
    followers_cnt: state => state.profile?.followers_cnt,

    authError: state => state.authError,
    authHeader: state => state.token ? ({ Authorization: `Token ${state.token}`}) : '',
    accountPage: state => state.accountPage,
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_IS_FOLLOW: (state, isFollow) => state.isFollow = isFollow,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_LIKESHOTS: (state, likeShots) => state.likeShots = likeShots,
    SET_USERSHOTS: (state, userShots) => state.userShots = userShots,
    SET_LIKEMOVIES: (state, likeMovies) => state.likeMovies = likeMovies,
    SET_ACCOUNT_PAGE: (state, accountPage) => state.accountPage = accountPage,
    DELETE_USERSHOT: (state, index) => state.userShots.splice(index, 1),
    DELETE_LIKESHOT: (state, index) => state.likeShots.splice(index, 1),
  },

  actions: {
    // 토큰 저장
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },

    // 토큰 삭제
    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },

    // 로그인
    login({ commit, dispatch }, { credentials, modalComp }) {
      axios({
        url: drf.accounts.login(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          commit('SET_AUTH_ERROR', null)
          modalComp.hide('modal-login')
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_ACCOUNT_PAGE', 'login')
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // 회원가입
    signup({ commit, dispatch }, { credentials, modalComp }) {
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          commit('SET_AUTH_ERROR', null)
          router.push({ name: 'home' })
          modalComp.hide('modal-signup')
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_ACCOUNT_PAGE', 'signup')
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // 로그아웃
    logout({ getters, commit, dispatch }, path) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          commit('SET_CURRENT_USER', {})
          if (path !== '/') {
            router.push({ name: 'home' })
          }
          alert('로그아웃 되었습니다.')
        })
        .catch(err => {
          console.error(err.response)
        })
    },

    // 유저 확인
    fetchCurrentUser({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => commit('SET_CURRENT_USER', res.data))
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('removeToken')
              router.push({ name: 'login' })
            }
          })
      }
    },

    // 프로필
    fetchProfile({ commit, getters }, { username }) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data.profile)
          commit('SET_IS_FOLLOW', res.data.is_follow)
          commit('SET_USERSHOTS', res.data.profile.shot_set)
          commit('SET_LIKESHOTS', res.data.profile.like_shots)
          commit('SET_LIKEMOVIES', res.data.profile.like_movies)
        })
        .catch(err => console.error(err.response))
    },

    // 팔로우
    followUser({ commit, getters }, userPk){
      axios({
        url: drf.accounts.follow(userPk),
        method: 'POST',
        data: getters.currentUser,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data.user)
          commit('SET_IS_FOLLOW', res.data.is_follow)
        })
        .catch(err => console.error(err.response))
    },

    // 네이버 로그인
    // naverLogin({ commit, dispatch }) {
    //   axios({
    //     url: drf.accounts.naverLogin(),
    //     method: 'post',
    //   })
    //     .then(res => {
    //       const token = res.data.key
    //       dispatch('saveToken', token)
    //       dispatch('fetchCurrentUser')
    //       router.push({ name: 'home' })
    //     })
    //     .catch(err => {
    //       console.error(err.response.data)
    //       commit('SET_AUTH_ERROR', err.response.data)
    //     })
    // },

    // 소셜 로그인
    // socialLogin({ commit, dispatch }, site) {
    //   redi
    //   // axios({
    //   //   url: drf.accounts.socialLogin(site),
    //   //   method: 'get',
    //   // })
    //   //   .then(res => {
    //   //     console.log(res)
    //   //     const token = res.data.key
    //   //     dispatch('saveToken', token)
    //   //     dispatch('fetchCurrentUser')
    //   //     router.push({ name: 'home' })
    //   //   })
    //   //   .catch(err => {
    //   //     console.error(err.response.data)
    //   //     commit('SET_AUTH_ERROR', err.response.data)
    //   //   })
    // },

  },
}
