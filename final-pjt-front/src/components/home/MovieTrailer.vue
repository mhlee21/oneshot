<template>
  <div class="position-relative">
    <div class="movie-trailer">
      <iframe 
        id="ytplayer" type="text/html" 
        width="100%" height="100%" :src="trailer" 
        allow="encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        frameborder="0">
      </iframe>
      <router-link 
        v-if="movieId"
        :to="{ name: 'detail', 
                params: { movieId : movieId } }"
        class="movie-trailer-title"
      >
        {{ movieTitle }} <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
      </router-link>
    </div>
    <!-- <div class="movie-trailer-blank"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MovieTrailer',
  computed: {
    ...mapGetters(['movieTrailer']),
    movieTitle() {
      if (this.movieTrailer.movie.title === undefined) { return }
      return this.movieTrailer.movie.title
    },
    movieId() {
      if (this.movieTrailer.movie.id === undefined) { return }
      return this.movieTrailer.movie.id
    },
    trailer() {
      return `${this.movieTrailer.trailer}?amp;autoplay=1&mute=1`
    }
  }
}
</script>

<style scoped>
  .movie-trailer-title {
    color: white;
    text-decoration: none;
    font-weight: bolder;
    font-size: 20px;
    position: absolute;
    right: 20%;
    top: 15%;
  }

  .movie-trailer {
    position:relative; 
    /* padding-bottom:56.25%;  */
    padding-bottom:50%; 
    padding-top:30px; 
    height: 300px; 
    width: 100vw;
    background-color: black;
    text-align: center;
    overflow:hidden;
    margin-left: calc(-50vw + 50%);
  }

  .movie-trailer iframe,
  .movie-trailer object,
  .movie-trailer embed {
    position:absolute; 
    top:0; 
    left:0; 
    /* width:100%;  */
    height:100%;
  }
</style>