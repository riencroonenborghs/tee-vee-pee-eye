import Vue from 'vue'
import { MdToolbar, MdIcon, MdButton, MdDialog, MdField, MdList, MdAvatar, MdCard, MdBadge, MdTooltip } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import VueSanitize from 'vue-sanitize'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import App from './App.vue'

const VueSanitizeDefaults = VueSanitize.defaults
VueSanitizeDefaults.allowedTags = []

Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(MdList)
Vue.use(MdAvatar)
Vue.use(MdCard)
Vue.use(MdBadge)
Vue.use(MdTooltip)
Vue.use(VueFlex)
Vue.use(VueSanitize, VueSanitizeDefaults)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
