import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'

Vue.use(VueLazyLoad, {
	loading: '/static/loading-svg/loading-bars.svg'
})
Vue.use(InfiniteScroll)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})