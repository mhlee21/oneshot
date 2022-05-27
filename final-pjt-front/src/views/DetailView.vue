<template>
  <div>
    <movie-trailer :movie-trailer="movieDetailHeader"></movie-trailer>
    <movie-info :movie="movie"></movie-info>
    <movie-comment-list></movie-comment-list>
  </div>
</template>

<script>
import MovieTrailer from '@/components/detail/MovieTrailer.vue'
import MovieInfo from '@/components/detail/MovieInfo.vue'
import MovieCommentList from '@/components/detail/MovieCommentList.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DetailView',
  components: {
    MovieTrailer, MovieInfo, MovieCommentList
  },
  methods: {
    ...mapActions(['fetchMovie']),
  },
  computed: {
    ...mapGetters(['movie', 'movieDetailHeader']),
  },
  created() {
    const movieId = this.$route.params.movieId
    this.fetchMovie(movieId)
  }
}
</script>

<style>

</style>