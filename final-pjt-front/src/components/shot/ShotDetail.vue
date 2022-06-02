<template>
  <b-modal 
    id="modal-shot"
    size='xl'
    hide-header hide-footer
    centered
    >
      <b-row no-gutters class="font-nanum-square">
        <b-col class="col-12 col-lg-6 small-shot">
          <div class="shot-wrapper2 shot-half-size">
            <b-card-img :src="shotImage" alt="Image" class="rounded-0 shot-image"></b-card-img>
            </div>
        </b-col>
        <b-col class="col-12 col-lg-6">
          <div class="shot-half-size px-4 py-4">
            <b-card-body class="w-100">
              <div class="d-flex align-content-between flex-wrap w-100">
                <!-- 상단 -->
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <!-- 프로필 -->
                    <div>
                      <div class="mouse-cursor-custom"  @click="moveProfile">
                        <font-awesome-icon icon="fa-solid fa-circle-user" size="2x" class="light" />
                        <strong>  {{ shotUserUsername }}  </strong>
                      </div>
                      <small class="text-muted" @click="moveDetail">#{{ shot.movie.title }}</small>
                    </div>
                    <div>
                      <!-- 수정 삭제 버튼 -->
                      <span v-if="currentUser.pk === shotUserPk">
                        <b-dropdown toggle-class="text-decoration-none" variant="link" no-caret>
                          <template #button-content>
                            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" size="xl" :style="{ color: 'gray' }" />
                          </template>
                          <b-dropdown-item @click="clickUpdateShot">수정</b-dropdown-item>
                          <b-dropdown-item @click="clickDeleteShot(shot.id)">삭제</b-dropdown-item>
                        </b-dropdown>
                      </span>
                    </div>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between">
                    <div>
                      <h5 class="d-inline">{{ shot.title }}  </h5>
                    </div>
                    <!-- 시간 -->
                    <small class="text-muted">{{ difTime }}</small>
                  </div>
                  <!-- 내용 -->
                  <div class="scroll-content">
                    {{ shot.content }}
                    <br>
                    <hr>
                    <div v-for="comment in shot.comments" :key="comment.id">
                      <shot-comments
                        :comment="comment"
                        :shot-id="shot.id"
                      ></shot-comments>
                    </div>
                  </div>
                </div>
                <!-- 하단 -->
                <div class="w-100">
                  <!-- 좋아요 수-->
                  <small class="text-muted">{{ shot.like_cnt }}명이 좋아합니다</small> 
                  <hr class="m-0">
                  <div class="d-flex">
                    <!-- 좋아요 버튼 -->
                    <div @click="clickLikeShot(shot.id, index, shotType)" class="col-1 d-flex align-items-center mouse-cursor-custom">
                      <font-awesome-icon v-show="isLike" icon="fa-solid fa-heart" size="xl" :style="{ color: 'red' }" />
                      <font-awesome-icon v-show="!isLike" icon="fa-regular fa-heart" size="xl" :style="{ color: 'black' }" />
                    </div>
                    <!-- 댓글 생성 -->
                    <div class="col-11">
                      <b-input-group class="mt-3 w-100">
                        <b-form-input v-model="commentInput" @keydown.enter="inputComment" placeholder="댓글 달기" class="w-75"></b-form-input>
                        <b-input-group-append>
                          <button @click="inputComment" class="btn btn-link text-muted" >게시</button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </div>
        </b-col>
      </b-row>
  </b-modal>
</template>

<script>
import drf from '@/api/drf'
import ShotComments from '@/components/shot/ShotComments.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShotDetail',
  components:{ ShotComments },
  data(){
    return {
      commentInput: '',
    }
  },
  computed:{
    ...mapGetters(['shot','index', 'isLike', 'currentUser', 'shotType','imageUrl']),
    shotImage(){
      if (drf.host.host() === 'http://localhost:8000/api/v1/') {
        return `${this.imageUrl}${this.shot.image}`
      }
      return `${this.shot.image}`
    },
    profileImage(){
      if (this.shot.user.profile_image){
        return `${this.imageUrl}${this.shot.user.profile_image}`
      } else {
        return ''
      }
    },
    shotUserUsername(){
      return this.shot.user?.username
    },
    shotUserPk(){
      return this.shot.user?.pk
    },
    difTime() {
      const today = new Date();
      const timeValue = new Date(this.shot.created_at);

      const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) return '방금전';
      if (betweenTime < 60) {
          return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
          return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
          return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    },
  },
  methods: {
    ...mapActions(['createShotComment', 'deleteShot', 'likeShot']),
    clickUpdateShot() {
      if (this.currentUser.pk){
        this.$bvModal.hide('modal-shot')
        this.$router.push({name: 'shotUpdate'})
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    clickDeleteShot(shotPk){
      if (this.currentUser.pk===this.shotUserPk){
        if (confirm('정말 삭제하시겠습니까?')) {
          this.$bvModal.hide('modal-shot')
          this.deleteShot({ shotPk, index: this.index, shotType:this.shotType })
        }
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    inputComment(){
      if (this.currentUser.pk){
        const data = {
          shotPk: this.shot.id,
          content:this.commentInput
        }
        this.createShotComment(data)
        this.commentInput = ''  
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    clickLikeShot(shotPk, index, shotType){
      if (this.currentUser.pk){
        const data = { shotPk, index, shotType}
        this.likeShot(data)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    moveProfile() {
      // 프로필 페이지에서 동일한 프로필 페이지로 이동 시 NavigationDuplicated 에러 방지를 위한 검사
      if (this.$route.path !== `/profile/${this.shotUserUsername}`){
        this.$router.push({ name: 'profile', params: { username:this.shotUserUsername }})
      }
      this.$bvModal.hide('modal-shot')
    },
    moveDetail() {
      this.$router.push({ name: 'detail', params: { movieId : this.shot.movie.pk }})
      this.$bvModal.hide('modal-shot')
    }
  },
}
</script>

<style>
  .modal-body {
    padding: 0 !important;
  }
  .modal-content {
    border: none;
    box-shadow : 5px 5px 10px #575757;
  }
  .shot-wrapper2 {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .font-nanum-square {
    font-family: NanumSquare;
  }
  .scroll-content {
    overflow: auto;
    height: 50vh;
  }
  .shot-detail-scroll {
    overflow: auto;
    height: 100%;
  }
  @media (max-width: 992px) {
    .small-shot {
      height: 55vw;
    }
    .scroll-content {
      height: 40vw;
    }
  }
</style>