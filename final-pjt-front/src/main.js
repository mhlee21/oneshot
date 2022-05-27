import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//fontawosome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleUser, faPlus, faHeart, faEllipsisVertical, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeart2 }  from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faCircleUser, faHeart, faHeart2, faEllipsisVertical, faCircleArrowRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
