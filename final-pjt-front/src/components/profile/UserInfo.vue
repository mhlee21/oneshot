<template>
  <div class="profile-box row mb-5 pt-5">
    <div class="col-5">
      <font-awesome-icon icon="fa-solid fa-circle-user" :style="{ color: '#6E30F2' }" class="profile-img" />
    </div>
    <div class="col-7 text-start">
      <h3>{{ username }}</h3>
      <div>
        <span>팔로워 {{ followers_cnt }}   </span>
        <span>팔로잉 {{ followings_cnt }} </span>
        <b-button v-if="ifNotMe()" @click="clickButton" class="follow-btn btn-sm">{{ getBtnText }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserInfo',
  props: {
    username: String,
  },
  computed: {
    ...mapGetters(['isFollow','currentUser', 'profileId', 'followings','followings_cnt','followers','followers_cnt']),
    getBtnText() {
      let btnText =''
      if (this?.isFollow) {
        btnText = '언팔로우'
      } else {
        btnText = '팔로우'
      }
      return btnText
    },
  },
  mutations: {
    SET_BTN_TEXT: (state, text) => state.btnText = text
  },
  methods: {
    ...mapActions(['followUser']),
    ifNotMe() {
      if (this.currentUser.pk === this.profileId) {
        return false
      } else {
        return true
      }
    },
    clickButton() {
      if (this.currentUser.pk){
        if (this.profileId) {
          this.followUser(this?.profileId)
        }
      } else {
        this.$bvModal.show('modal-login')
      }
    }
  }
}
</script>

<style scoped>
  .profile-box {
    height: 300px;
  }
  .profile-img {
    font-size: 200px;
  }
  .follow-btn {
    background-color: #6E30F2 !important;
    border: #6E30F2 solid 1px;
  }

</style>