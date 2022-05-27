<template>
  <div class="shot-size">
    <b-card
      no-body
      tag="article"
      style="max-width: 30rem; text-align:left;"
      class="mb-2"
    >
      <div class="shot-wrapper">
        <img :src="shotImage" alt="image" @click="detailOpen(shot.id)" class="shot-image mouse-cursor-custom">
      </div>
      <b-card-body>
        <div class="d-flex justify-content-between">
          <!-- 제목 -->
          <h5 class="shot-title">{{ shot.title }}</h5>
          <!-- 좋아요 -->
          <span @click="clickLikeShot(shot.id, index, shotType)" class="mouse-cursor-custom">
            <font-awesome-icon v-show="isLiked[index]" icon="fa-solid fa-heart" size="xl" :style="{ color: 'red' }" />
            <font-awesome-icon v-show="!isLiked[index]" icon="fa-regular fa-heart" size="xl" :style="{ color: 'black' }" />
          </span>
        </div>
        <!-- 글 내용 -->
        <b-card-text class="card-text">
          {{ shot.content }}
        </b-card-text>
        <div class="d-flex justify-content-between me-2">
          <small><router-link :to="{ name: 'detail', params: { movieId : shot.movie.pk }}" class="text-muted">#{{ shot.movie.title }}</router-link></small>
          <small class="text-muted">{{ difTime }}</small>
        </div>
        <hr>
        <!--  유저, 좋아요, 댓글 수 -->
        <div class="d-flex justify-content-between">
          <div @click="moveProfile" class="mouse-cursor-custom">
            <font-awesome-icon v-if="!shot.user.profile_image" icon="fa-solid fa-circle-user" size="xl" :style="{ color: '#6E30F2' }" />
            <img v-else :src="profileImage" alt="profile image">
            <strong>  {{ shotUserUsername }}</strong  >
          </div>
          <div class="me-2">
            <small>좋아요 {{ shot.like_cnt}}개 댓글 {{ shot.comments_cnt }}개</small> 
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TheShot',
  props: {
    shot: Object,
    index: Number,
  },
  computed:{
    ...mapGetters(['isLiked', 'currentUser', 'shotType']),
    difTime() {
      const today = new Date();
      const timeValue = new Date(this.shot.created_at);

      const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) return '방금 전';
      if (betweenTime < 60) {
          return `${betweenTime}분 전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
          return `${betweenTimeHour}시간 전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
          return `${betweenTimeDay}일 전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년 전`;
    },
    shotImage() {
      return `${this.shot.image}`
    },
    shotUserUsername() {
      return this.shot?.user.username
    },
  },
  methods:{
    ...mapActions(['fetchShot', 'likeShot']),
    detailOpen(shotPk) {
      this.fetchShot({ shotPk, index: this.index, shotType: 'shot' })
      this.$bvModal.show('modal-shot')
    },
    clickLikeShot(shotPk, index, shotType) {
      if (this.currentUser.pk){
        const data = { shotPk, index, shotType }
        this.likeShot(data)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    moveProfile() {
      this.$router.push({ name: 'profile', params: { username: this.shotUserUsername }})
    },
  },
}
</script>

<style>
  .shot-size {
    width: 400px;
    height: 400px;
  }
  .shot-wrapper {
    width: 400px;
    position: relative; 
    height: 210px; 
  }
  .shot-image {
    position: absolute; 
    top: 0; 
    left: 0; 
    transform: translate(50, 50); 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    margin: auto;
  }
  .card-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* 여러 줄 자르기 추가 스타일 */
    white-space: normal;
    line-height: 1.2;
    height: 2.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .shot-title {
    font-family: 'NanumSquareBold';
  }
</style>