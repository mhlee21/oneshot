import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'


export default {
  state: {
    movies: [],
    movie: {},
    haveTrailer: false,
    movieDetailHeader: '',
    movieIsLiked: false,
    movieComments: {},
    popularMovies: [],
    nowPlaying: [],
    myGenre: [],
    myMovies: [],
    shotestMovies: [],
    movieTrailer: {
      movie: {},
      trailer: '',
    },
    popPageNum: 0,
    nowPageNum: 0,
    moviePageNum: 0,
    movieMaxPage: 0,
    movieStar: 0,
    isDetail: false,
    movieTitle: [],
  },

  getters: {
    movies: state => state.movies,
    movie: state => state.movie,
    haveTrailer: state => state.haveTrailer,
    movieDetailHeader: state => state.movieDetailHeader,
    movieIsLiked: state => state.movieIsLiked,
    movieLikeCnt: state => state.movie.like_cnt,
    movieComments: state => state.movieComments,
    popularMovies: state => state.popularMovies,
    nowPlaying: state => state.nowPlaying,
    myGenre: state => state.myGenre,
    myMovies: state => state.myMovies,
    shotestMovies: state => state.shotestMovies,
    popPageNum: state => state.popPageNum,
    nowPageNum: state => state.nowPageNum,
    moviePageNum: state => state.moviePageNum,
    movieMaxPage: state => state.movieMaxPage,
    movieTrailer: state => state.movieTrailer,
    movieStar: state => state.movieStar,

    // isAuthor: (state, getters) => {
    //   return state.movie.user?.username === getters.currentUser.username
    // },
    isMovie: state => !_.isEmpty(state.movie),
    isDetail: state => state.isDetail,
    movieTitle: state => state.movieTitle,
  },

  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_HAVETRAILER: (state, haveTrailer) => state.haveTrailer = haveTrailer,
    SET_MOVIE_DETAIL_HEADER: (state, url_path) => state.movieDetailHeader = url_path,
    SET_MOVIE_LIKE: (state, movieIsLiked) => state.movieIsLiked = movieIsLiked,
    SET_MOVIE_LIEK_CNT: (state, like_cnt) => state.movie.like_cnt = like_cnt,
    SET_MOVIE_TRAILER: (state, movieTrailer) => state.movieTrailer = movieTrailer,
    SET_MOVIE_COMMENTS: (state, comments) => state.movieComments = comments,
    SET_POPULARMOVIES: (state, popularMovies) => state.popularMovies = popularMovies,
    SET_NOWPLAYING: (state, nowPlaying) => state.nowPlaying = nowPlaying,
    SET_MY_GENRES: (state, myGenre) => state.myGenre = myGenre,
    SET_MY_MOVIES: (state, myMovies) => state.myMovies = myMovies,
    SET_SHOTESTMOVIES: (state, shotestMovies) => state.shotestMovies = shotestMovies,
    SET_MOVIEMAXPAGE:(state, movieMaxPage) => state.movieMaxPage = movieMaxPage,
    RESET_MOVIEPAGENUM:(state) => state.moviePageNum = 0,
    ADD_MOVIEPAGENUM: (state) => state.moviePageNum += 1,
    ADD_MOVIES: (state, newMovies) => state.movies.push(...newMovies),
    SET_MOVIE_STARS: (state, movieStar) => state.movieStar = movieStar,
    SET_MOVIE_TITLE: (state, movieTitle) => state.movieTitle = movieTitle,
  },

  actions: {
    // 영화 목록 받아오기
    fetchHomeMovies({ commit, getters }, apiMethod) {
      let newUrl = ''
      if (apiMethod == 'now_playing') {
        newUrl = drf.movies.nowPlaying(getters.nowPageNum)
      } else if (apiMethod == 'popular') {
        newUrl = drf.movies.popular(getters.popPageNum)
      } else if (apiMethod == 'shotest') {
        newUrl = drf.movies.shotest()
      } else if (apiMethod == 'my_movies') {
        newUrl = drf.movies.myMovies()
      }
      axios({
        url: newUrl,
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          if (apiMethod == 'now_playing') {
            commit('SET_NOWPLAYING', res.data.movies)
          } else if (apiMethod == 'popular') {
            commit('SET_POPULARMOVIES', res.data.movies)
          } else if (apiMethod == 'shotest') {
            commit('SET_SHOTESTMOVIES', res.data)
          } else if (apiMethod == 'my_movies') {
            commit('SET_MY_GENRES', res.data.genre)
            commit('SET_MY_MOVIES', res.data.result)
          }
        })
        .catch(err => console.error(err.response))
    },

    fetchMovies({ commit, getters }, params) {
      axios({
        url: drf.movies.movies(0),
        method: 'get',
        headers: getters.authHeader,
        params: params
      })
        .then(res => {
          commit('SET_MOVIES', res.data.movies)
          commit('ADD_MOVIEPAGENUM')
          commit('SET_MOVIEMAXPAGE', res.data.max_page)
        })
        .catch(err => console.error(err.response))
    },

    // 이후 스크롤 시 추가 영화 받아오기
    addMovies({ commit, getters }) {
      axios({
        url: drf.movies.movies(getters.moviePageNum),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('ADD_MOVIES', res.data.movies)
          commit('ADD_MOVIEPAGENUM')
        })
        .catch(err => console.error(err.response))
    },

    // 영화 상세
    fetchMovie({ commit, getters }, moviePk) {
      axios({
        url: drf.movies.movie(moviePk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data.movie)
          commit('SET_MOVIE_DETAIL_HEADER', res.data.url_path)
          commit('SET_MOVIE_LIKE', res.data.is_liked)
          commit('SET_MOVIE_COMMENTS', res.data.movie.comments)
          if (res.data.stars) {
            commit('SET_MOVIE_STARS', res.data.stars.star)
          } else {
            commit('SET_MOVIE_STARS', 0)
          }
          commit('SET_HAVETRAILER', res.data.have_trailer)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    // 영화 예고편
    fetchTrailer({ commit, getters }) {
      axios({
        url: drf.movies.movieTrailer(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE_TRAILER', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    likeMovie({ commit, getters }, moviePk) {
      axios({
        url: drf.movies.likeMovie(moviePk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_LIKE', res.data.is_liked)
          commit('SET_MOVIE_LIEK_CNT', res.data.movie.like_cnt)
        })
        .catch(err => console.error(err.response))
    },

		createMovieComment({ commit, getters }, { moviePk, content }) {
      const comment = { content }

      axios({
        url: drf.movies.comments(moviePk),
        method: 'post',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updateMovieComment({ commit, getters }, { moviePk, commentPk, content }) {
      const comment = { content }

      axios({
        url: drf.movies.comment(moviePk, commentPk),
        method: 'put',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteMovieComment({ commit, getters }, { moviePk, commentPk }) {

        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.movies.comment(moviePk, commentPk),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_MOVIE_COMMENTS', res.data)
            })
            .catch(err => console.error(err.response))
        }
    },

    createOrUpdateStarRating({ getters, commit }, { moviePk, star }){
      const starRating = { star }
      axios({
        url: drf.movies.starRating(moviePk),
        method: 'post',
        data: starRating,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_STARS', res.data.star)
        })
        .catch(err => console.error(err.response))
    },

    deleteStarRating({getters, commit}, moviePk){
      axios({
        url: drf.movies.starRating(moviePk),
        method: 'delete',
        data: {},
        headers: getters.authHeader,
      })
        .then( () => {
          commit('SET_MOVIE_STARS', 0)
        })
        .catch(err => console.error(err.response))
    },

    fetchMovieTitles({getters, commit}){
      axios({
        url: drf.movies.movieTitle(),
        method: 'GET',
        data: {},
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_TITLE', res.data.movie_title)
        })
        .catch(err => console.error(err.response))
    }
  },
}
