<template>
  <b-modal 
    id="modal-signup"
    hide-header 
    hide-footer
    centered
    size="lg"
    >  
    <b-container fluid class="signup-box">
      <b-row class="h-100 background-gray">
        <b-col class="pt-lg-5 h-lg-100 ps-lg-5 col-12 col-lg-5 row mx-0">
          <h1 class="pt-lg-5 welcome-ment col-5 col-lg-12 pt-4">WELCOME</h1>
          <p class="ms-3 col-5 col-lg-12 pt-4 pt-lg-0">
            영화로 일상을 공유하는, 
            <br>
            <b>ONE SHOT</b>에 오신 것을
            <br>
            진심으로 환영합니다!
          </p>
          <div class="h-50"></div>
        </b-col>
        <b-col class="col-12 col-lg-7 bg-white signup">
          <b-row class="text-center my-lg-5 my-3" sty>
            <h2 class="signup-ment">회원가입</h2>
            <account-error-list v-if="authError && isSignupView"></account-error-list>
          </b-row>
          <b-row class="col-12">
            <b-row class="mb-1 text-center">
              <b-col class="col-lg-10">
                <b-row class="mb-3">
                  <b-col class="text-lg-end col-5">
                    <label for="username"><b>아이디</b> </label>
                  </b-col>
                  <b-col class="col-7">
                    <input v-model="credentials.username" type="text" id="username" required />
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="text-lg-end col-5">
                    <label for="password1"><b>비밀번호</b> </label>
                  </b-col>
                  <b-col class="col-7">
                    <input v-model="credentials.password1" type="password" id="password1" required />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-lg-end col-5">
                    <label for="password2"><b>비밀번호 확인</b> </label>
                  </b-col>
                  <b-col class="col-7">
                    <input v-model="credentials.password2" type="password" id="password2" required />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="d-flex justify-content-center mt-4">
              <b-button id="signup-btn" @click="signup(credentials)">회원가입</b-button>
            </b-row>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'SignupView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password1: '',
          password2: '',
        }
      }
    },
    computed: {
      ...mapGetters(['authError', 'accountPage']),
      isSignupView() {
        if(this.accountPage === 'signup'){
          return true
        } else {
          return false
        }
      }

    },
    methods: {
      signup(credentials){
        this.$store.dispatch('signup', {credentials, modalComp:this.$bvModal})
        this.credentials.username = ''
        this.credentials.password1 = ''
        this.credentials.password2 = ''
      }
    },
  }
</script>

<style>
  #modal-signup {
    font-family: 'NanumSquare', Arial, sans-serif;
  }
  .signup-box {
    align-content: center;
    height: 400px;
  }
  .signup-ment{
    font-family: 'NanumSquareBold', Arial, sans-serif;
  }
  .background-gray {
    background-color: #F7F8F9;
  }
  .welcome-ment {
    font-family: 'NanumMyeongjoBold', Arial, sans-serif;
  }
  #signup-btn {
    background-color: #6E30F2;
    width: 350px;
  }
  .signup {
    padding-bottom: 30px;
  }
</style>
