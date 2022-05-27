<template>
  <div>
    <user-info
    :username="username"
    ></user-info>

    <user-movie
      user-act-title="좋아요 한 영화"
      :movies="likeMovies"
    ></user-movie>
    <user-shot
      user-act-title="작성한 글"
      :shots="userShots"
      shotType="userShot"
    ></user-shot>
    <user-shot
      user-act-title="좋아요 한 글"
      :shots="likeShots"
      shotType="likeShot"
    ></user-shot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserInfo from '@/components/profile/UserInfo.vue'
import UserMovie from '@/components/profile/UserMovie.vue'
import UserShot from '@/components/profile/UserShot.vue'


export default {
  name: 'ProfileView',
  components:{ UserInfo, UserMovie, UserShot },
  computed: {
    ...mapGetters(['profile', 'userShots', 'likeShots', 'likeMovies']),
    username(){
      return this.profile?.username
    }
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  watch: {
    $route(to, from) {
      if (to !== from){
        const payload = { username: this.$route.params.username }
        this.fetchProfile(payload)
      }
    },
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>
