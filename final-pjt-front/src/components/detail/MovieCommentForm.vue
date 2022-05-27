<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label-for="set-comment" class="comment-input mx-auto">
        <b-form-input
          id="set-comment"
          type="text"
          v-model="content"
          placeholder="댓글 달기"
          required
          class="py-0 py-lg-1"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="comment-btn btn-sm">게시</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name:'MovieCommentForm',
  data() {
    return {
      content: '',
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser']),
    movieId() {
      return this.movie?.id
    }
  },
  methods: {
    ...mapActions(['createMovieComment']),
    onSubmit() {
      if (this.currentUser.pk){
        const params = {
          moviePk: this.movieId,
          content: this.content,
        }
        this.createMovieComment(params)
        this.content = ''
      } else {
        this.$bvModal.show('modal-login')
      }
    }
  },
}
</script>

<style>
  .comment-input {
    width: 80%;
    display: inline-block;
    padding-right: 20px;
  }
  .comment-btn {
    background-color: #6E30F2 !important;
    border: none !important;
  }
</style>