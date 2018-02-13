<template>
	<div>
		<nav-header></nav-header>

		<div class="container">
			<div class="check-step">
				<ul>
					<li class="cur">地址确认</li>
					<li class="cur">查看订单</li>
					<li class="cur">支付</li>
					<li class="cur">订单成功</li>
				</ul>
			</div>

			<div class="order-create">
				<div class="order-create-pic"><img src="/static/ok-2.png"></div>
				<div class="order-create-main">
					<h3>Congratulations! <br>您的订单正在备货中...</h3>
					<p>
						<span>订单号：{{orderId}}</span>
						<span>支付：{{orderTotal | currency('￥')}}</span>
					</p>
					<div class="order-create-btn-wrap">
						<div class="btn-l-wrap">
							<a href="javascript:;"></a>
							<router-link class="btn btn--m" to="/">返回首页</router-link>
						</div>
						<div class="btn-r-wrap">
							<router-link class="btn btn--m" to="/">继续购物</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>

		<nav-footer></nav-footer>
	</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
  import axios from 'axios'
  import {currency} from '@/util/currency'

  export default{
  	data(){
  		return {
  			orderId:'',
  			orderTotal:0
  		}
  	},
  	components:{
  		NavHeader,
  		NavFooter
  	},
  	filters:{
  		currency
  	},
  	mounted(){
  		let orderId = this.$route.query.orderId
  		if(!orderId) return;

  		axios.get('/users/orderDetail',{
  			params:{
  				orderId:orderId
  			}
  		}).then(response => {
  			let res = response.data
  			if(res.status === '0'){
  				this.orderId = orderId
  				this.orderTotal = res.result.orderTotal
  			}
  		})
  	}
  }
</script>