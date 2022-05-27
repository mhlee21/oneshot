<template>
  <div class="row">
      <the-movie v-for="movie in movies" :key="movie.id" :movie="movie"></the-movie>
  </div>
</template>

<script>
import TheMovie from '@/components/movie/TheMovie.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'MovieList',
  components: {
    TheMovie,
  },
  computed:{
    ...mapGetters(['movies', 'moviePageNum', 'movieMaxPage']),
  },
  methods: {
    ...mapActions(['fetchMovies', 'addMovies']),
    scrollMoviePage(e){
      if (this.moviePageNum && this.movieMaxPage && this.$route.name){
        if (this.moviePageNum <= this.movieMaxPage && this.$route.name === 'movie') {
          const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement
          if(clientHeight + scrollTop >= scrollHeight) {
            this.addMovies()
          }
        }
      }
    },
  },
  created(){
    this.fetchMovies()
    window.addEventListener('scroll', this.scrollMoviePage)
  }
}
</script>

<style>

</style>