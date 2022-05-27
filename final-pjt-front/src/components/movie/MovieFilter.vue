<template>
  <div id="movie-filter">
    <!-- 영화 제목 -->
    <div class="row p-0">
      <div class="col-2 my-auto">영화 제목</div>
      <div class="col-10 d-flex justify-content-between">
        <b-input type="text" id="movie-search-input" v-model="title" @keydown.enter="search"></b-input>
        <b-button id="movie-search-button" @click="search">검색</b-button>
      </div>
    </div>
    <hr>
    <!-- 장르 -->
    <div class="row">
      <div class="col-2 my-auto">영화 장르</div>
      <div class="col-10">
        <b-form-group>
          <template v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="genres"
              v-model="genre"
              :options="genres"
              :aria-describedby="ariaDescribedby"
              name="genres"
              class="ml-4"
              aria-label="Individual genres"
              plain
            ></b-form-checkbox-group>
          </template>
        </b-form-group>
      </div>   
    </div>
    <hr>
    <!-- 개봉일 -->
    <div class="row">
      <div class="col-2 my-auto">개봉일</div>
      <div class="col-10 d-flex">
        <b-form-datepicker id="datepicker1" v-model="releaseDateStart" class="me-2" size="sm"></b-form-datepicker> 
        <b-form-datepicker id="datepicker2" v-model="releaseDateEnd" class="ms-2" size="sm"></b-form-datepicker>
      </div>
    </div>
    <hr>
    <!-- 평점 -->
    <div class="row">
      <div class="col-2 my-auto">평점</div>
      <div class="col-10 d-flex">
        <b-form-input id="type-number" type="number" min=0 max=10 step=0.1 class="me-2" v-model="voteAverageStart" size="sm"></b-form-input>
        <b-form-input id="type-number" type="number" min=0 max=10 step=0.1 class="ms-2" v-model="voteAverageEnd" size="sm"></b-form-input>
      </div>
    </div>
    <hr>
    <!-- 선택된 태그 -->
    <div class="row">
      <div class="col-2 my-auto">선택된 태그</div>
      <div class="col-10">
        <div class="selected-form">
          <!-- 영화제목 -->
          <span
            v-if="title" 
            class="badge badge-pill"
            @click="deleteTitle">
            {{ title }}
          </span>
          <!-- 장르 -->
          <span
            v-for="(g, idx) in genre"
            :key="idx"
            class="badge badge-pill"
            @click="deleteGenre(idx)">
            {{ g }}
          </span>
          <!-- 개봉일 -->
          <span
            v-if="releaseDateStart && releaseDateEnd"
            class="badge badge-pill"
            @click="deleteReleaseDate">
            {{ releaseDateStart }} ~ {{ releaseDateEnd }}
          </span>
          <!-- 평점 -->
          <span
            v-if="voteAverageStart && voteAverageEnd"
            class="badge badge-pill"
            @click="deleteVoteAverage">
            {{ voteAverageStart }} ~ {{ voteAverageEnd }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name:'MovieFilter',
    data() {
      return {
        title: '',
        genre: [],
        releaseDateStart: '',
        releaseDateEnd: '',
        voteAverageStart: '',
        voteAverageEnd: '',
        genres: ['액션', '코미디', 'SF', '모험', '판타지', '애니메이션', '드라마', '공포', '로맨스', '미스터리', '범죄', '스릴러', '역사', '서부', '다큐멘터리', '가족', '전쟁', 'TV 영화', '음악'],
      }
    },
    methods: {
      ...mapActions(['fetchMovies']),
      search(){
        const params = {
          title:this.title, 
          genre:this.genre.join(','), 
          release_date_start: this.releaseDateStart, 
          release_date_end: this.releaseDateEnd,
          vote_average_start: this.voteAverageStart,
          vote_average_end: this.voteAverageEnd,
        }
        this.fetchMovies(params)
      },
      deleteTitle()   {
        this.title = ''
      },
      deleteGenre(index) {
        this.genre.splice(index, 1)
      },
      deleteReleaseDate() {
        this.releaseDateStart = this.releaseDateEnd = ''
      },
      deleteVoteAverage() {
        this.voteAverageStart = this.voteAverageEnd = ''
      }
    },
  }
</script>

<style scoped>
  #movie-filter {
    border: solid 1px white;
    box-shadow: 0px 2px 3px 1px rgba(163, 174, 184, 0.7);
    background-color: #FDFDFD;
    padding: 2vh 2vw;
    margin: 2vh auto;
  }
  #movie-search-input {
    display: inline-block;
    margin-right: 1vw;
  }
  #movie-search-button {
    width: 70px;
  }
  div#genres {
    display: flex;
    flex-wrap: wrap;
  }
  .selected-form {
    display: block;
    width: 100%;
    color: black;
    background-color: white;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    appearance: none;
    height: 100%;
    padding: .375rem .75rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 1rem;
    min-height: 31px;
  }
  .badge {
    background-color: #5C636A;
    margin-right: 5px;
    font-weight: 500;
  }
</style>