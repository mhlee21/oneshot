import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'


export default {
  state: {
    shots: [],
    shot: {},
    pageNum: 0,
    maxPage: 0,
    isLiked: [],
    index: 0,
    isLike: null,
    shotType: '',
    // imageUrl: 'https://one-shot-api.link',
  },

  getters: {
    shots: state => state.shots,
    shot: state => state.shot,
    isAuthor: (state, getters) => {
      return state.shot.user?.username === getters.currentUser.username
    },
    isShot: state => !_.isEmpty(state.shot),
    isLiked: state => state.isLiked,
    pageNum: state => state.pageNum,
    maxPage: state => state.maxPage,
    index: state => state.index,
    isLike: state => state.isLike,
    shotType: state => state.shotType,
    // imageUrl: state => state.imageUrl,
  },

  mutations: {
    SET_SHOTS: (state, shots) => state.shots = shots,
    ADD_SHOTS: (state, newShots) => state.shots.push(...newShots),
    SET_SHOT: (state, shot) => state.shot = shot,
    DELETE_SHOT: (state, index) => state.shots.splice(index, 1),

    SET_INDEX: (state, index) => state.index = index,
    SET_SHOTTYPE: (state, shotType) => state.shotType = shotType,
    
    RESET_PAGENUM:(state) => state.pageNum = 0,
    ADD_PAGENUM: (state) => state.pageNum += 1,
    SET_MAXPAGE: (state, maxPage) => state.maxPage = maxPage,

    SET_ISLIKED: (state, isLiked) => state.isLiked = isLiked,
    ADD_ISLIKED: (state, isLiked) => state.isLiked.push(...isLiked),
    SET_ISLIKE: (state, isLike) => state.isLike = isLike,
    
    RESET_SHOTS_LIKE: (state, {index, like, like_cnt}) => {
      state.isLiked[index] = like,
      state.shots[index].like_cnt = like_cnt
    },
    RESET_SHOT_LIKE: (state, { like_cnt }) => {
      state.shot.like_cnt = like_cnt
      state.isLike = !state.isLike
    },

    SET_SHOT_COMMENTS: (state, comments) => (state.shot.comments = comments),
    ADD_COMMENT_CNT: (state) => state.shots[state.index].comments_cnt += 1,
    MINUS_COMMENT_CNT: (state) => state.shots[state.index].comments_cnt -= 1,
  },

  actions: {
    // 처음에 게시글 목록 받아오기
    fetchShots({ commit, getters }, shotType) {
      commit('RESET_PAGENUM')
      axios({
        url: drf.shots.shots(0),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_SHOTS', res.data.shots)
          commit('ADD_PAGENUM')
          commit('SET_MAXPAGE', res.data.max_page)
          commit('SET_ISLIKED', res.data.is_liked)
          commit('SET_SHOTTYPE', shotType)
        })
        .catch(err => console.error(err.response))
    },

    // 이후 스크롤 시 게시물 받아오기
    addShots({ commit, getters }) {
      axios({
        url: drf.shots.shots(getters.pageNum),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('ADD_SHOTS', res.data.shots)
          commit('ADD_PAGENUM')
          commit('ADD_ISLIKED', res.data.is_liked)
        })
        .catch(err => console.error(err.response))
    },

    // shot 정보 받기
    fetchShot({ commit, getters }, { shotPk, index, shotType }) {
      axios({
        url: drf.shots.shotDetail(shotPk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_SHOT', res.data.shot)
          commit('SET_ISLIKE', res.data.is_liked)
          commit('SET_INDEX', index)
          commit('SET_SHOTTYPE', shotType)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    createShot({ getters }, shot) {
      const newHeader = { ...getters.authHeader, 'Content-Type': 'multipart/form-data' }
      axios({
        url: drf.shots.shotCreate(),
        method: 'post',
        data: shot,
        headers: newHeader,
      })
        .then(() => {
          alert('글이 생생되었습니다.')
          router.push({
            name: 'shot',
          })
        })
    },

    updateShot({ commit, getters }, { pk, title, content}) {
      axios({
        url: drf.shots.shot(pk),
        method: 'put',
        data: { title, content },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_SHOT', res.data)
          router.push({
            name: 'shot'
          })
        })
    },

    deleteShot({ commit, getters }, {shotPk, index, shotType}) {
      axios({
        url: drf.shots.shot(shotPk),
        method: 'delete',
        headers: getters.authHeader,
      })
        .then(() => {
          commit('SET_SHOT', {})
          if (shotType === 'shot'){
            commit('DELETE_SHOT', index)
          } else if (shotType === 'likeShot'){
            commit('DELETE_LIKESHOT', index)
          } else { //shotType == 'userShot'
            commit('DELETE_USERSHOT', index)
          }
        })
        .catch(err => console.error(err.response))
    },

    likeShot({ commit, getters }, {shotPk, index, shotType}) {
      axios({
        url: drf.shots.likeShot(shotPk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          if (shotType === 'shot'){
            commit('RESET_SHOTS_LIKE', { index:index, like:res.data.is_like, like_cnt:res.data.like_cnt })
          }
          commit('RESET_SHOT_LIKE', { like_cnt:res.data.like_cnt })
        })
        .catch(err => console.error(err.response))
    },

		createShotComment({ commit, getters }, { shotPk, content }) {
      const comment = { content }
      axios({
        url: drf.shots.comments(shotPk),
        method: 'post',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_SHOT_COMMENTS', res.data)
          if (getters.shotType === 'shot'){
            commit('ADD_COMMENT_CNT')
          }
        })
        .catch(err => console.error(err.response))
    },

    updateShotComment({ commit, getters }, { shotPk, commentPk, content }) {
      const comment = { content }
      axios({
        url: drf.shots.comment(shotPk, commentPk),
        method: 'put',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_SHOT_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteShotComment({ commit, getters }, { shotPk, commentPk }) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.shots.comment(shotPk, commentPk),
          method: 'delete',
          data: {},
          headers: getters.authHeader,
        })
          .then(res => {
            commit('SET_SHOT_COMMENTS', res.data)
            if (getters.shotType === 'shot'){
              commit('MINUS_COMMENT_CNT')
            }
          })
          .catch(err => console.error(err.response))
      }
    },
  },
}
