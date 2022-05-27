<template>
  <div>
    <movie-trailer></movie-trailer>
    <section>
      <div v-if="isLoggedIn">
        <movie-chart
          movie-chart-title="어디서 좋은 향 안나요? 완전 네 취향"
          :my-genre="myGenre"
          :movie-list="myMovies"
          class="movie-chart"
        ></movie-chart>
      </div>
      <div class="blank-box"></div>
      <movie-chart
        movie-chart-title="실시간 영화 순위"
        :movie-list="nowPlaying"
        class="movie-chart"
      ></movie-chart>
      <div class="blank-box"></div>
      <movie-chart
        movie-chart-title="오늘 안보면 스포당하는 영화"
        :movie-list="popularMovies"
        class="movie-chart"
      ></movie-chart>
      <div class="blank-box"></div>
      <movie-chart
        movie-chart-title="사람들의 기억속에 담긴 영화들"
        comment="shot 후기에 가장 많이 언급된 영화들을 추천합니다."
        :movie-list="shotestMovies"
        class="movie-chart"
      ></movie-chart>
      <div class="blank-box"></div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieChart from '@/components/home/MovieChart'
import MovieTrailer from '@/components/home/MovieTrailer'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    MovieChart,
    MovieTrailer,
  },
  computed: {
    ...mapGetters(['isLoggedIn','movies','popularMovies','nowPlaying','shotestMovies','myGenre','myMovies']),
  },
  methods: {
    ...mapActions(['fetchHomeMovies', 'fetchTrailer']),
  },
  watch:{
    isLoggedIn(){
      if (this.isLoggedIn){
        this.fetchHomeMovies('my_movies')
      }
    }
  },
  created() {
    this.fetchTrailer()
    this.fetchHomeMovies('now_playing')
    this.fetchHomeMovies('popular')
    this.fetchHomeMovies('shotest')
    if (this.isLoggedIn){
      this.fetchHomeMovies('my_movies')
    }
  },
}
</script>

<style>
  .movie-chart {
    margin: 50px 0 100px;
    height: 300px;
  }
  .blank-box {
    height: 50px;
  }
</style>

