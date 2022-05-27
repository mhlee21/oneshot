<template>
  <b-navbar toggleable="lg" :class="[{ 'navbar-dark': isDetail }, { darknav: isDetail }]" class="d-flex justify-content-between align-items-end">
    <router-link :to="{ name: 'home' }" :class="[{ 'light': !isDetail }, { 'dark': isDetail }]" class="mb-0 me-3">
      <div class="logo">
        ONE SHOT
      </div>
    </router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link :to="{ name: 'home' }" :class="[{ 'dark': isDetail }]">Home</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'movie'}" :class="[{ 'dark': isDetail }]">Movie</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'shot'}" :class="[{ 'dark': isDetail }]">Shot</router-link></b-nav-item>
      </b-navbar-nav>

      <div class="ms-auto">
        <!-- 비로그인 -->
        <b-navbar-nav v-if="!isLoggedIn">
          <b-nav-item v-b-modal.modal-login><span :class="[{ 'dark': isDetail }]">로그인</span></b-nav-item>
          <b-nav-item v-b-modal.modal-signup><span :class="[{ 'dark': isDetail }]">회원가입</span></b-nav-item>
        </b-navbar-nav>
        <!-- 로그인 -->
        <b-navbar-nav v-if="isLoggedIn">
          <!-- 샷 추가 -->
          <b-nav-item-dropdown toggle-class="text-decoration-none" variant="link" no-caret>
            <template #button-content>
              <font-awesome-icon icon="fa-solid fa-plus" size="2x"  :class="[{'darkblue': !isDetail}, { 'dark': isDetail }]" />
            </template>
            <b-dropdown-item @click="moveNewShot">NEW Shot</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- 프로필 -->
          <b-nav-item-dropdown toggle-class="text-decoration-none" variant="link" no-caret>
            <template #button-content>
              <font-awesome-icon icon="fa-solid fa-circle-user" size="2x" :class="[{ 'light': !isDetail }, { 'dark': isDetail }]" />
            </template>
            <b-dropdown-item @click="moveProfile">프로필</b-dropdown-item>
            <b-dropdown-item @click="logout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </b-collapse>
  </b-navbar>
  
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['isLoggedIn', 'currentUser', 'isDetail']),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      },
      isDetail() {
        return this.$route.name === 'detail'
      }
    },
    methods: {
      logout() {
        if (this.isLoggedIn) {
          this.$store.dispatch('logout', this.$route.path)
        } else {
          alert('잘못된 접근')
          this.$router.back()
        }
      },
      moveProfile() {
        if (this.currentUser.pk){
          // 프로필 페이지에서 동일한 프로필 페이지로 이동 시 NavigationDuplicated 에러 방지를 위한 검사
          if (this.$route.path !== `/profile/${this.username}`){
            this.$router.push({ name: 'profile', params: { username:this.username }})
          }
        } else {
          this.$bvModal.show('modal-login')
        }
      },
      moveNewShot(){
        if (this.currentUser.pk){
          this.$router.push({ name: 'shotCreate'})
        } else {
          this.$bvModal.show('modal-login')
        }
      }
    },
  }
</script>

<style>
  nav { 
    padding: 30px 15%; 
    border-bottom: 1px solid #e4e8eb;
    font-size: 20px; 
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }

  nav a.router-link-exact-active { color: #6E30F2; }

  .logo {
    font-size: 50px;
  }

  .darknav {
    background-color: black !important;
    border-bottom: none;
  }

  .light {
    color:#6E30F2 !important;
  }

  .dark {
    color:#FAFAFA !important;
  }

  .darkblue {
    color: #2c3e50 !important;
  }

</style>
