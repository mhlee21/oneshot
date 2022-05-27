<template>
  <div @click="clickMovie(movie.pk)" class="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
    <div class="position-relative h-100">
      <img :src="moviePosterPath" alt="poster image" class="w-100 h-100" @mouseenter="mouseEnter" >
      <div :class="{ 'movie-info-block': active }" 
        class="w-100 h-100 d-flex flex-column justify-content-center" 
        @mouseleave="mouseLeave">
        <h5 v-show="active" class="fw-bolder">{{ movie.title }}</h5>
        <div>
          <span v-show="active" v-for="(genre, index) in movie.genres" :key="index">{{ genre.name }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMovie',
  data(){
    return {
      active: false,
    }
  },
  props:{
    movie: Object,
  },
  computed: {
    moviePosterPath() {
      return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
    },
  },
  methods:{
    clickMovie(moviePk) {
      this.$router.push({ name: 'detail', params: { movieId : moviePk } })
    },
    mouseEnter(){
      this.active = true
    },
    mouseLeave(){
      this.active = false
    },
  },
}
</script>

<style scoped>
  .card-body {
    padding-bottom: 0;
  }

  .movie-info-block {
    background: black;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    opacity: 0.7;
    color: white;
    text-align: center;
  }

</style>