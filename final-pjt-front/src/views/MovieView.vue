<template>
  <div>
    <movie-filter></movie-filter>
    <movie-list></movie-list>
  </div>
</template>

<script>

import MovieFilter from '@/components/movie/MovieFilter.vue'
import MovieList from '@/components/movie/MovieList.vue'
export default {
  name: 'MovieView',
  components: {
    MovieFilter, MovieList,
  },
}
</script>

<style>

</style>