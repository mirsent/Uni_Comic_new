import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$requestUrl = 'https://comic.ineinv.com/index.php/Home/'

Vue.prototype.$imgUrl = 'https://comic.ineinv.com/'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
