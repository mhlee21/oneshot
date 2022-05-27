<template>
  <div class="row py-2">
    <!-- 이름 -->
    <div class="col-12 col-lg-2">
      <div @click="moveProfile" class="mouse-cursor-custom d-flex flex-column">
        <font-awesome-icon icon="fa-solid fa-circle-user" size="2x" class="light under-lg-none"/>
      </div>
      <div class="under-lg-left">
        <div class="under-lg-inline"><small>{{ getUserName }}</small></div>
        <div class="under-lg-inline"><small class="text-muted">{{ difTime }}</small></div>
      </div>
    </div>
    <!-- 댓글과 버튼 -->
    <div class="col-lg-10 row text-start col-12">
      <div class="speech-bubble">
        <div class="comment-box-min-height">
          <div v-if="!isUpdating">{{ getContent }}</div>
          <div v-else>
            <b-form-input type="text" v-model="updatedComment" placeholder="댓글 수정" required></b-form-input>
          </div>
        </div>
        <span v-if="currentUser.pk === comment.user.pk">
          <div v-if="!isUpdating" class="text-right">
            <span @click="updateComment" class="btn btn-sm btn-link p-0 text-muted">수정</span>
            <span @click="deleteComment" class="btn btn-sm btn-link p-0 text-muted">삭제</span>
          </div>
          <div v-else class="text-right">
            <span @click="updateComment" class="btn btn-sm btn-link text-muted">저장</span>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name:'MovieComment',
  props: {
    comment: Object,
  },
  data() {
    return {
      isUpdating: false,
      updatedComment: this.comment.content,
      movieId: this.comment?.movie
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    getCommentId() {
      return this.comment?.id
    },
    getUserName() {
      return this.comment?.user.username
    },
    getContent() {
      return this.comment?.content
    },
    difTime(){
      const today = new Date();
      const timeValue = new Date(this.comment.created_at);

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
    ...mapActions(['updateMovieComment', 'deleteMovieComment']),
    changeUpdate() {
      this.isUpdating = !this.isUpdating
    },
    updateComment() {
      if (this.currentUser.pk){
        const params = {
          moviePk: this.movieId,
          commentPk: this.getCommentId,
          content: this.updatedComment,
        }
        this.updateMovieComment(params)
        this.changeUpdate()
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    deleteComment() {
      if (this.currentUser.pk){
        const params = {
          moviePk: this.movieId,
          commentPk: this.getCommentId,
        }
        this.deleteMovieComment(params)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    moveProfile() {
      this.$router.push({ name: 'profile', params: { username:this.getUserName }})
    },
  }
}
</script>

<style>
  .speech-bubble {
    position: relative;
    background: #f5f5f5;
    border-radius: .4em;
    padding: 5px 10px;
    box-shadow: 0px 3px 5px 1px rgba(163, 174, 184, 0.7);
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-right-color: #f5f5f5;
    border-left: 0;
    border-top: 0;
    margin-top: -13.5px;
    margin-left: -27px;
  }

  .text-right{
    text-align: right;
  }

  .comment-box-min-height {
    min-height: 65%;
    word-break:break-all;
  }

  @media (max-width: 992px ){
    .speech-bubble:after{
      display: none;
    }
    .under-lg-none {
      display: none;
    }
    .under-lg-inline {
      display: inline;
    }
    .under-lg-left {
      text-align: left;
    }
  }
</style>