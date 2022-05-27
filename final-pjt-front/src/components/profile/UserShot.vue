<template>
  <div>
    <div class="movie-chart-title-box">
      <div class="point-bar"></div>
      <h4 class="movie-chart-title">{{ userActTitle }}</h4>
    </div>
    
    <div v-if="shots.length" class="shot-img-group d-flex flex-wrap mb-5">
      <div class="shot-img-wrapper" v-for="(shot, index) in shots" :key="shot.pk">
        <img :src="imgPath(shot)" alt="Shot Image" 
          @click="detailOpen(shot.id, index)" 
          class="shot-img">
      </div>
    </div>
    <div v-else>
      <br>
      {{ userActTitle }}이 없습니다.
      <br><br>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserShot',
  props: {
    userActTitle: String,
    shots: Array,
    shotType:String,
  },
  methods: {
    ...mapActions(['fetchShot']),
    detailOpen(shotPk, index) {
      this.fetchShot({ shotPk, index: index, shotType:this.shotType })
      this.$bvModal.show('modal-shot')
    },
    imgPath(shot) {
      return `${shot.image}`
    }
  }
}
</script>

<style scoped>
  .shot-img-group {
    display: flex;
  }
  .shot-img-wrapper {
    position: relative; width: 32%; height: 22vw; margin:0.4vw;
  }
  .shot-img {
    position: absolute; top: 0; left: 0; transform: translate(50, 50); width: 100%; height: 100%; object-fit: cover; margin: auto;
  }
</style>