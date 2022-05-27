<template>
  <div>
    <div class="movie-chart-title-box">

      <!-- 타이틀 -->
      <div class="point-bar"></div>
      <h4 class="movie-chart-title">{{ movieChartTitle }}</h4>
    </div>
    <h6 v-if="comment" class="movie-chart-comment">{{ comment }}</h6>
    <div v-if="myGenre" class="movie-chart-comment ms-3">
      <b-button 
        v-for="(genre, idx) in myGenre" :key="idx"
        class="mx-1"
        size="sm" variant="outline-secondary"
        style="cursor:default"
      >#{{ genre }}</b-button>
    </div>
    <br>
    <div>
      <vueper-slides
        class="no-shadow movie-poster-list mx-auto me-lg-5"
        :visible-slides="3"
        slide-multiple
        autoplay
        @autoplay-pause="internalAutoPlaying = false"
        @autoplay-resume="internalAutoPlaying = true"
        :gap="1"
        :slide-ratio="1 / 3"
        :dragging-distance="200"
        :fixed-height="true"
        :breakpoints="{ 768: { visibleSlides: 1, slideMultiple: 1 }, 992: { visibleSlides: 2, slideMultiple: 2 }, 1400: { visibleSlides: 3, slideMultiple: 3 } }">
        <vueper-slide 
          v-for="(movie, index) in movieList"
          :key="index"
          class="movie-poster" 
          :image="getImagePath(movie.poster_path)"
          @click.native="goToDetail(movie.pk)"
        />
      </vueper-slides>
      <movie-chart-list
        :movie-list="movieList"
        class="movie-chart-list"
      ></movie-chart-list>
    </div>
  </div>
</template>

<script>
import MovieChartList from '@/components/home/MovieChartList.vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import router from '@/router'

export default {
  name: 'MovieChart',
  components: { MovieChartList, VueperSlides, VueperSlide },
  props: {
    movieChartTitle: String,
    movieList: Array,
    comment: String,
    myGenre: Array,
  },
  methods: {
    getImagePath(path) {
      return `https://image.tmdb.org/t/p/original/${path}`
    },
    goToDetail(movieId) {
      if (movieId){
        router.push({
          name: 'detail',
          params: { movieId },
        })
      } 
    },
  },
}
</script>

<style>
  .movie-chart-title-box {
    display: flex;
    align-content: center;
    margin-bottom: 20px;
  }

  .movie-chart-comment {
    display: flex;
    align-content: center;
  }

  .point-bar {
    display: inline-block;
    width: 7px;
    height: 30px;
    background-color: #6E30F2;
  }

  .movie-chart-title {
    display: inline;
    margin: 0 10px 0;
    font-family: 'NanumSquareBold';
    font-size: 24px;
  }

  .movie-poster-list {
    width: 70%;
    display: inline-block;
    margin-right: 50px;
  }

  .movie-poster {
    display: inline-block;
    background-color: lightgray;
    border-radius: 5%;
    height: auto;
  }

  .vueperslide__image {
    transform: scale(1.5) rotate(-10deg);
  }

  .movie-chart-list {
    width: 20%;
    display: inline-block;
  }

  .vueperslides__track-inner {
    height: 100%;
  }

  .vueperslides--fixed-height { 
    height: 320px;
  }

  @media(max-width: 992px) {
    .vueperslides__bullet .default{
      display: none !important;
    }

    .movie-chart-list {
      display: none;
    }

    .point-bar {
      height: 20px !important;
      width: 4px;
    }

    .movie-chart-title {
      font-size: 18px;
    }

    .movie-chart-comment {
      font-size: 14px;
      text-align: left;
    }
  }

</style>