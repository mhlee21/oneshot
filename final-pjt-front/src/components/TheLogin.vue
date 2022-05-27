<template>
  <b-modal 
    id="modal-login"
    hide-header
    hide-footer
    centered
    size="lg"
    >
      <b-container fluid class="login-box">
        <b-row class="h-100">
          <b-col class="pt-lg-5 welcome h-100 ps-lg-5 ps-3 col-5">
            <h1 class="pt-5 welcome-ment">WELCOME</h1>
            <p class="mt-4 ms-3">
              영화로 일상을 공유하는, 
              <br>
              <b>ONE SHOT</b>에 오신 것을
              <br>
              진심으로 환영합니다!
            </p>
          </b-col>
          <b-col class="col-7">
            <b-row class="text-center my-lg-5 my-3" sty>
              <h2 class="login-ment">로그인</h2>
              <account-error-list v-show="authError && isLoginView"></account-error-list>
            </b-row>
            <b-row>
              <b-row class="mb-1 text-center">
                <b-col class="col-lg-9 col-12">
                  <b-row class="mb-3">
                    <b-col class="text-lg-end col-12 col-lg-4">
                      <label for="username"><b>아이디</b> </label>
                    </b-col>
                    <b-col>
                      <input v-model="credentials.username" type="text" id="username" required />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="text-lg-end col-12 col-lg-4">
                      <label for="password"><b>비밀번호</b> </label>
                    </b-col>
                    <b-col>
                      <input v-model="credentials.password" type="password" id="password" required @keydown.enter="login(credentials)"/>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col class="col-lg-3 col-12 mt-4 mt-lg-0">
                  <b-button class="h-100" id="login-btn" @click="login(credentials)">로그인</b-button>
                </b-col>
              </b-row>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    <!--  소셜 로그인 구현 -->
    <!-- <div>
      <a href="http://127.0.0.1:8000/api/v1/accounts/naver/login/"><img class="social-login-button" src="../assets/naver_login.png" alt="naver login"></a>
      <a href="http://127.0.0.1:8000/api/v1/accounts/google/login/"><img class="social-login-button" src="../assets/google_signin.png" alt="google login"></a>
      <a href="http://127.0.0.1:8000/api/v1/accounts/kakao/login/"><img class="social-login-button" src="../assets/kakao_login.png" alt="kakao login"></a>

    </div> -->
  </b-modal>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'TheLogin',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        }
      }
    },
    computed: {
      ...mapGetters(['authError', 'accountPage']),
      isLoginView() {
        if(this.accountPage === 'login'){
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      login(credentials){
        this.$store.dispatch('login', {credentials, modalComp:this.$bvModal})
        this.credentials.username = ''
        this.credentials.password = ''
      },
    },
  }
</script>

<style>
  /* .social-login-button {
    width: 200px;
    display: block;
  } */
  #modal-login {
    font-family: 'NanumSquare', Arial, sans-serif;
  }
  .login-box {
    height: 350px;
    align-content: center;
  }
  .login-ment{
    font-family: 'NanumSquareBold', Arial, sans-serif;
  }
  .welcome {
    background-color: #F7F8F9;
  }
  .welcome-ment {
    font-family: 'NanumMyeongjoBold', Arial, sans-serif;
  }
  #login-btn {
    background-color: #6E30F2;
  }
</style>
