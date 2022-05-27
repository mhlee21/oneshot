<template>
  <div class="py-5 px-md-5 comment-box mt-lg-5">
    <div class="comment-title-box">
      <div class="point-bar"></div>
      <h4 class="comment-title">  COMMENTS</h4>
    </div>
    <div class="px-lg-5 py-3">
      <movie-comment-form></movie-comment-form>
      <div class="pb-5 pt-3">
        <div v-if="!movieComments.length">
          아직 작성된 코멘트가 없습니다! 코멘트를 남겨주세요 :)
        </div>
        <movie-comment 
          v-for="(comment, index) in movieComments"
          :key="index"
          :comment="comment"
        >
        </movie-comment>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCommentForm from '@/components/detail/MovieCommentForm.vue'
import MovieComment from '@/components/detail/MovieComment.vue'
import { mapGetters } from 'vuex'

export default {
  name:'MovieCommentList',
  components: { MovieCommentForm, MovieComment },
  computed: {
    ...mapGetters(['movieComments']),    
  },
}
</script>

<style>
  .comment-list {
    width: 20%;
    display: inline-block;
  }
  .point-bar {
    display: inline-block;
    width: 7px;
    height: 30px;
    background-color: #6E30F2;
  }
  .comment-title-box {
    display: flex;
    align-content: center;
    margin-bottom: 20px;
  }
  .comment-title {
    display: inline;
    margin: 0 10px 0;
    font-size: 24px;
  }
  .comment-box {
    margin: auto;
    width: 100%;
  }
   @media (min-width: 992px) {
    .comment-box {
      width: 75%;
    }
  }
</style>