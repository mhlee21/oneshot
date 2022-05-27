<template>
  <div class="row movie-info text-start">
    <!-- 포스터 -->
    <div class="col-12 col-lg-4 movie-poster-wrapper">
      <b-img :src="moviePoster" alt="movie poster" class="movie-poster"></b-img>
    </div>
    
    <!-- 영화 정보 -->
    <div class="col-12 col-lg-8 col-xl-6 p-0">
      <!-- 개봉일 / 장르 -->
      <small><small class="text-muted">{{ movieReleaseDate }}・{{ movieGenre }}</small></small>
      
      <div class="d-flex justify-content-between">
        <div>
          <!-- 제목 -->
          <h3 class="d-inline">{{ movieTitle }}  </h3>
          <small v-if="movieVoteScore">평균 {{ movieVoteScore }}/10 점</small>
        </div>
        <div>
          <!-- 좋아요 수 -->
          <small class="text-muted">좋아요 {{ movieLikeCnt }}개  </small>
          <!-- 좋아요 -->
          <span @click="clickLikeMovie" class="mouse-cursor-custom">
            <font-awesome-icon v-show="movieIsLiked" icon="fa-solid fa-heart" size="xl" :style="{ color: 'red' }" />
            <font-awesome-icon v-show="!movieIsLiked" icon="fa-regular fa-heart" size="xl" :style="{ color: 'black' }" />
          </span>
        </div>
      </div>
      <br>
      <!-- 평점등록 -->
      <b-input-group>
        <div class="d-flex align-items-center justify-content-center">
          <div class="star-rating me-md-3 p-0">
            <b-form-rating v-model="star" stars="10" inline variant="warning" no-border></b-form-rating>
          </div>
          <div class="text-end d-flex flex-wrap">
              <button v-if="!is_rated" @click="createStar" class="star-button btn btn-warning text-light btn-sm py-0">등록</button>
              <div>
                <button v-if="is_rated" @click="createStar" class="star-button btn btn-warning text-light btn-sm py-0 me-lg-2">재등록</button>
                <button v-if="is_rated" @click="deleteStar" class="star-button btn btn-warning text-light btn-sm py-0">삭제</button>
              </div>
          </div>
        </div>
      </b-input-group>
      <br>
      
      <!-- 줄거리 -->
      <small>{{ movieOverView }}</small>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name:'MovieInfo',
  props: {
    movie: Object,
  },
  data() {
    return {
      star: 0,
      is_rated: false,
    }
  },
  computed: {
    ...mapGetters(['movieIsLiked', 'movieLikeCnt', 'currentUser', 'movieStar']),
    // getStar(){
    //   return this.stars?.star
    // },
    moviePoster() {
      // GET https://image.tmdb.org/t/p/original/undefined 404 에러 방지를 위해 if문 추가
      if (this.movie?.poster_path === undefined) {
        return ''
      }
      return `https://image.tmdb.org/t/p/original/${this.movie?.poster_path}`
    },
    movieTitle() {
      return this.movie?.title
    },
    movieReleaseDate() {
      return this.movie?.release_date?.slice(0,4)
    },
    movieGenre() {
      const genres = this.movie?.genres
      let res = ''
      if (genres) {
        res = genres.map(genre=>genre.name)?.join(' / ')
      }
      return res
    },
    movieVoteScore() {
      return this.movie?.vote_average
    },
    movieOverView() {
      return this.movie?.overview
    },
    movieId() {
      return this.movie?.id
    },
  },
  watch: {
    movieStar() {
      this.star = this.movieStar
      if (this.movieStar){
        this.is_rated = true
      } else {
        this.is_rated = false
      }
    }
  },
  methods: {
    ...mapActions(['likeMovie', 'createOrUpdateStarRating', 'deleteStarRating']),
    clickLikeMovie() {
      if (this.currentUser.pk){
        this.likeMovie(this.movieId)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    createStar() {
      if (this.currentUser.pk){
        if (this.star === 0) {
          alert('별점을 등록해주세요!')
        } else {
          this.is_rated = true
          const params = {
            moviePk: this.movieId,
            star: this.star,
          }
          this.createOrUpdateStarRating(params)
        }
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    deleteStar() {
      if (this.currentUser.pk){
        this.star = 0
        this.is_rated = false
        this.deleteStarRating(this.movieId)
      } else {
        alert('잘못된 접근입니다!')
      }
    }
  },
}
</script>

<style scoped>
  .movie-poster {
    display: none;
  }

  .star-button {
    max-width: 100px;
    font-size: 12px;
    font-family: 'NanumSquareBold';
    min-width: 45px;
  }
  .movie-poster-wrapper {
    display: none;
  }
  /* .b-rating .b-rating-star, .b-rating .b-rating-value{
    padding: 0;
  } */
  .b-rating-star {
    padding: 0;
  }
  .b-rating {
    padding: 0;
  }

  @media (min-width: 992px) {
    .movie-poster {
      z-index: 2;
      height: calc(320px - 2vw);
      box-shadow: 0px 3px 5px 1px rgba(163, 174, 184, 0.7);
      border: solid 1px white;
      position: absolute;
      left: calc(-210px + 100%);
      top: -45px;
      display: block;
    }
    .movie-poster-wrapper {
      position: relative;
      display: block;
    }
  }
</style>