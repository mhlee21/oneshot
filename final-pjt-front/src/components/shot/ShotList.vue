<template>
  <div class="shot-list" @scroll="scrollPage">
    <div v-if="!shots.length" class="mt-3">글이 존재하지 않습니다. 기억하고 싶은 영화를 shot으로 공유해주세요!</div>
    <div v-for="(shot, index) in shots" :key="shot.id" class="shot-between">
      <the-shot 
        :shot="shot"
        class="shot"
        :index="index"
      ></the-shot>
    </div>
  </div>
</template>

<script>
import TheShot from '@/components/shot/TheShot.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShotList',
  components: {
    TheShot,
  }, 
  computed:{
    ...mapGetters(['shots', 'pageNum', 'maxPage'])
  },
  methods: {
    ...mapActions(['fetchShots', 'addShots', 'fetchShot']),
    scrollPage(e){
      if (this.pageNum <= this.maxPage && this.$route.name === 'shot') {
        const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement
        if(clientHeight + scrollTop >= scrollHeight) {
          this.addShots()
        }
      }
    },
  },
  created(){
    this.fetchShots('shot')
    window.addEventListener('scroll', this.scrollPage)
  },
}
</script>

<style>
  .shot {
    display: inline-block;
    margin: 10px;
  }
  .shot-list {
    margin: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .shot-between {
    margin-bottom: 20px;
  }

</style>