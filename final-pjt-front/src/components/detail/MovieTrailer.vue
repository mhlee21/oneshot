<template>
  <div>
    <div class="position-relative">
      <div class="movie-trailer">
        <iframe 
          v-if="haveTrailer"
          id="ytplayer" type="text/html" 
          width="100%" height="100%" 
          :src="movieTrailerUrl" frameborder="0" allowfullscreen
        >
        </iframe>
        <div v-else class="trailer-img-wrapper">
          <img :src="movieTrailerUrl" class="trailer-img" alt="movie trailer">
          <div class="trailer-img trailer-effect"></div>
        </div>
      </div>
    </div>
    <div class="movie-trailer-blank"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MovieTrailer',
  props: {
    movieTrailer: String,
  },
  computed: {
    ...mapGetters(['haveTrailer']),
    movieTrailerUrl() {
      if (this.haveTrailer) {
        return this.movieTrailer + '?amp;autoplay=1&mute=1'
      }
      return this.movieTrailer
    }
  }
}
</script>

<style scoped>
  .movie-trailer {
    height: 53vh;
    width: 100vw;
    position:absolute;
    background-color: black;
    text-align: center;
    margin-left: calc(-50vw + 50%);
  }
  .movie-trailer-blank {
    height: 55vh;
  }
  .trailer-img-wrapper {
    position: relative; width: 100vw; height: 500px;
  }
  .trailer-img {
    position: absolute; 
    top: 0; 
    left: 15%; 
    transform: translate(50, 50); 
    width: 70%; 
    height: 100%; 
    object-fit: cover; 
    margin: auto;
  }
  .trailer-effect {
    z-index: 1;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%);
  }
</style>