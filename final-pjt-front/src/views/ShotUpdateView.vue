<template>
  <div class="mt-4">
    <form @submit.prevent="updateShot">
        <b-row no-gutters class="d-flex align-items-center justify-content-center">
          <b-col xl="6">
            <div class="empty mx-auto">사진과 영화 정보는 수정할 수 없습니다.</div>
          </b-col>
          <b-col xl="6">
            <div class="form-item">
              <div></div>
              <label for="shot-title">제목</label>
              <b-form-input v-model="newShot.title" type="text" name="title" id="shot-title" required></b-form-input>
            </div>
            <div class="form-item">
              <label for="shot-content text-content">내용</label>
              <b-form-textarea v-model="newShot.content" name="content" id="shot-content" cols="30" rows="10" required></b-form-textarea>
            </div>
            <b-button class="my-3 w-100" type="submit">수정</b-button>
          </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'ShotUpdateView',
  data () {
    return {
      newShot:{
        title: '',
        content: '',
      },
    }
  },
  computed:{
    ...mapGetters(['shot']),
    shotTitle(){
      return this.shot?.title
    },
    shotContent(){
      return this.shot?.content
    },
  },
  methods: {
    updateShot(){
      if (this.shot.image === ''){
        alert('이미지를 넣어주세요')
      } else {
        const data = { pk:this.shot.id, title: this.newShot.title, content: this.newShot.content }
        this.$store.dispatch('updateShot', data)
      }
    },
  },
  created(){
    this.newShot.title = this.shot?.title
    this.newShot.content = this.shot?.content
  }
}
</script>

<style scoped>
.empty {
  width: 25rem;
  height: 25rem;
  text-align: center;
  border: lightgray solid;

  display: flex;
  justify-content: center;
  align-items: center;
}

.form-item {
  display: flex;
  flex-wrap: wrap;
}

.shot-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
}
</style>