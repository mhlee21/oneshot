<template>
  <div>
    <b-container fluid>
      <b-form @submit.prevent="createShot(shot)">
        <b-row no-gutters class="d-flex align-items-center justify-content-center">
          <b-col xl="6">
            <div class="form-item flex-column justify-content-center align-items-center">
              <div v-if="shotImage" class="w-100">
                <b-img :src="shotImageUrl" class="mb-3 w-100" fluid block rounded></b-img>
              </div>
              <div v-else fluid class="mb-3 empty"></div>
              <b-form-file
                id="shot-image" 
                type="image"
                accept=".jpg, .png, .gif"
                v-model="shotImage"
                drop-placeholder="Drop file here..."
                plain
                required
              ></b-form-file>
            </div>
          </b-col>
          <b-col xl="6">
            <div class="form-item">
              <label for="shot-title">제목</label>
              <b-form-input 
                v-model="shot.title" 
                type="text" name="title" id="shot-title" 
                aria-describedby="shot-feedback"
                min-length=1
                :state="input_length_check(shot.title)" 
                aria-invalid="true"
                required
              >
              </b-form-input>
              <b-form-invalid-feedback id="shot-feedback"> 100자 이상 입력할 수 없습니다.</b-form-invalid-feedback>
            </div>
            <div class="form-item">
              <label for="shot-movie-char">영화제목</label>
              <b-form-input 
                v-model="shot.movie_char" 
                type="text" name="movie_char" list="shot-movie-char"
                aria-describedby="shot-feedback"
                :state="movie_check(shot.movie_char)" 
                aria-invalid="true"
                required
              >
              </b-form-input>
              <b-form-invalid-feedback id="shot-feedback"> 영화 정보가 없습니다.</b-form-invalid-feedback>
              <datalist id="shot-movie-char">
                <option>Movie Option</option>
                <option v-for="(movie,idx) in movieTitle" :key="idx">{{ movie }}</option>
              </datalist>
            </div>
            <div class="form-item">
              <label for="shot-content">내용</label>
              <b-form-textarea v-model="shot.content" name="content" id="shot-content" cols="30" rows="10" required></b-form-textarea>
            </div>
            <b-button class="my-3 w-100" :disabled="!movie_check(shot.movie_char)" type="submit">NEW SHOT</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const base64Encode = (data) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(data)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default {
  name:'ShotCreateView',
  data () {
    return {
      shot:{
        title: '',
        content: '',
        movie_char: '',
        image: null,
      },
      shotImage: null,
      shotImageUrl: null,
    }
  },
  computed: {
    ...mapGetters(['movieTitle']),
  },
  methods: {
    ...mapActions(['fetchMovieTitles']),
    createShot(shot){
      if (this.shot.image === ''){
        alert('이미지를 넣어주세요')
      } else {
        this.$store.dispatch('createShot', shot)
      }
    },
    input_length_check(check) {
      if (check.length === 0) {
        return false
      }
      return check.length > 100 ? false : true
    },
    movie_check(check) {
      if (this.movieTitle.includes(check)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    shotImage(newValue, oldValue) {
      this.shot.image = newValue
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then((value) => {
              this.shotImageUrl = value
            })
            .catch(() => {
              this.shotImageUrl = null
            })
        } else {
          this.shotImageUrl = null
        }
      }
    }
  },
  created() {
    this.fetchMovieTitles()
  }
}
</script>

<style scoped>
.empty {
  width: 25rem;
  height: 25rem;
  background: gray;
  margin: auto;
}

.form-item {
  display: flex;
  flex-wrap: wrap;
}

</style>