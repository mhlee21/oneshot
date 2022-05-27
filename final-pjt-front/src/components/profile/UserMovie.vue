<template>
  <div>
    <div class="movie-chart-title-box">
      <div class="point-bar"></div>
      <h4 class="movie-chart-title">{{ userActTitle }}</h4>
    </div>
    
    <vueper-slides
      v-if="movies.length"
      class="no-shadow movie-poster-list w-100"
      :visible-slides="6"
      slide-multiple
      :gap="1"
      :slide-ratio="1 / 6"
      :dragging-distance="200"
      fixed-height="350px"
      :breakpoints="{ 800: { visibleSlides: 2, slideRatio: 1 / 2}, 1300: { visibleSlides: 3, slideRatio: 1 / 3}, 1400: { visibleSlides: 4, slideRatio: 1 / 4 }, 1800: { visibleSlides: 5, slideRatio: 1 / 5 },   }"
    >
      <vueper-slide 
        class="movie-poster" 
        v-for="(movie, index) in movies" 
        :key="index" 
        :image="getImagePath(movie.poster_path)"
        @click.native="goToDetail(movie.id)"
        :style="'background-color: #6E30F2'"
      />
    </vueper-slides>
    <div v-else>
      <br>
      {{ userActTitle }}가 없습니다.
      <br><br>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import router from '@/router'
export default {
  name: 'UserMovie',
  components: { VueperSlides, VueperSlide },
  props: {
    userActTitle: String,
    movies: Array,
  },
  methods: {
    getImagePath(path) {
      return `https://image.tmdb.org/t/p/original/${path}`
    },
    goToDetail(movieId) {
      router.push({
        name: 'detail',
        params: { movieId },
      })
    },
  },
}
</script>

<style scoped>


</style>