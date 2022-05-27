<template>
  <div class="py-1 d-flex justify-content-between ">
    <div>
      <div @click="moveProfile" class="mouse-cursor-custom">
        <font-awesome-icon v-if="!comment.user.profile_image" icon="fa-solid fa-circle-user" size="xl" :style="{ color: '#6E30F2' }" />
        <img v-else :src="imagePath(shot.user.profile_image)" alt="profile image">
       <strong>  {{ commentUserUsername }}</strong>
      </div>
      <span v-if="!isUpdating">
        {{ comment.content }}
      </span>
      <input v-else type="text" v-model="updatedComment">
      <div v-if="!isUpdating" class="ms-4">
        <small>
          <small class="text-muted">{{ difTime }}</small>
        </small>
      </div>
    </div>
    <div>
      <span v-if="currentUser.pk === comment.user.pk">
        <span v-if="!isUpdating">
          <button @click="changeUpdate" class="btn btn-link btn-sm text-muted p-0">수정</button>
          <button @click="deleteComment" class="btn btn-link btn-sm text-muted p-0">삭제</button>
        </span>
        <button v-else @click="updateComment" class="btn btn-link btn-sm text-muted p-0">저장</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
export default {
  name:'ShotComments',
  data (){
    return {
      isUpdating: false,
      updatedComment: this.comment.content,
    }
  },
  props: {
    comment: Object,
    shotId: Number,
  },
  computed:{
    difTime() {
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
    ...mapGetters(['currentUser', 'imageUrl']),
    commentUserUsername(){
      return this.comment?.user.username
    },
    imagePath(img) {
      return this.imageUrl + img 
    },
  },
  methods: {
    ...mapActions(['updateShotComment', 'deleteShotComment']),
    changeUpdate(){
      this.isUpdating = true
    },
    updateComment(){
      if (this.currentUser.pk){
        this.isUpdating = false
        const data = { shotPk:this.shotId, commentPk: this.comment.id, content:this.updatedComment }
        this.updateShotComment(data)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    deleteComment(){
      if (this.currentUser.pk){
        const data = { shotPk: this.shotId, commentPk: this.comment.id }
        this.deleteShotComment(data)
      } else {
        this.$bvModal.show('modal-login')
      }
    },
    moveProfile() {
      // 프로필 페이지에서 동일한 프로필 페이지로 이동 시 NavigationDuplicated 에러 방지를 위한 검사
      if (this.$route.path !== `/profile/${this.commentUserUsername}`){
        this.$router.push({ name: 'profile', params: { username:this.commentUserUsername }})
      }
      this.$bvModal.hide('modal-shot')
    },
  }
}
</script>

<style>

</style>