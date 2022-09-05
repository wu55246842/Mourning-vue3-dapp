import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// event bus
import eventBus from './utils/eventBus'
app.config.globalProperties.$eventBus = eventBus
// store
import store from './store'
app.use(store)

// router
import router from './router'
app.use(router)
// i18n
import i18n from './utils/language'
app.use(i18n)
window.t = i18n.global.t

//ant
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


app.use(Antd)

//bootstrap
// import BootstrapVue3 from 'bootstrap-vue-3'
// // import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
// app.use(BootstrapVue3)

import 'jquery'

import SocialSharing  from 'vue-social-sharing'
app.use(SocialSharing)


app.config.globalProperties.getNowFormatDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  };


app.mount('#app')
