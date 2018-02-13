<template>
	<div>
		<nav-header></nav-header>
		<nav-bread><span>订单列表</span></nav-bread>

		<div class="container">
			<div class="checkout-order">
				<div class="check-step">
					<ul>
						<li class="cur">地址确认</li>
						<li class="cur">查看订单</li>
						<li>支付</li>
						<li>订单成功</li>
					</ul>
				</div>

				<div class="item-list-wrap confirm-item-list-wrap">
					<div class="cart-item order-item">
						<div class="cart-item-head">
							<ul>
								<li>商品</li>
								<li>单价</li>
								<li>数量</li>
								<li>总计</li>
							</ul>
						</div>
						<ul class="cart-item-list">
							<li v-for="item in cartList" v-if="item.checked === '1'">
								<div class="cart-tab-1">
									<div class="cart-item-pic">
										<img v-lazy="'/static/' + item.productImage">
									</div>
									<div class="cart-item-title">
										<div class="item-name">{{item.productName}}</div>
									</div>
								</div>
								<div class="cart-tab-2">
									<div class="item-price">{{item.salePrice | currency('￥')}}</div>
								</div>
								<div class="cart-tab-3">
									<div class="item-quantity">
										<div class="select-self">
											<div class="select-self-area">
												<span class="select-ipt">×{{item.productNum}}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="cart-tab-4">
									<div class="item-price-total">{{(item.salePrice * item.productNum) | currency('￥')}}</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="price-count-wrap">
					<div class="price-count">
						<ul>
							<li>
								<span>总计:</span>
								<span>{{ subTotal| currency('￥')}}</span>
							</li>
							<li>
								<span>运费:</span>
								<span>{{ shipping| currency('￥')}}</span>
							</li>
							<li>
								<span>优惠:</span>
								<span>{{ discount| currency('￥')}}</span>
							</li>
							<li class="order-total-price">
								<span>共:</span>
								<span>{{ orderTotal| currency('￥')}}</span>
							</li>
						</ul>
					</div>
				</div>

				<div class="order-foot-wrap">
					<div class="prev-btn-wrap">
						<router-link class="btn btn--m btn--red" to="/address">上一步</router-link>
					</div>
					<div class="next-btn-wrap">
						<button class="btn btn--m btn--red" @click="payMent">去支付</button>
					</div>
				</div>
			</div>
		</div>

		<nav-footer></nav-footer>
	</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import axios from  'axios'
import {currency} from '@/util/currency'

export default{
	data(){
		return {
			cartList:[],
			shipping: 6,
			discount: 20,
			subTotal: 0,
			orderTotal: 0
		}
	},
	components:{
		NavHeader,
		NavBread,
		NavFooter
	},
	filters:{
		currency
	},
	mounted(){
		this.init()
	},
	methods: {
		init() {
			axios.get("/users/cartList").then(response => {
				let res = response.data
				this.cartList = res.result

				this.cartList.forEach(item => {
					if (item.checked === '1') {
						this.subTotal += item.salePrice * item.productNum
					}
				})
				this.orderTotal = this.subTotal + this.shipping - this.discount
			})
		},

		payMent(){
			let addressId = this.$route.query.addressId
			axios.post('/users/payMent',{
				addressId:addressId,
				orderTotal:this.orderTotal
			}).then(response => {
				let res = response.data
				if(res.status === '0'){
					this.$router.push({
						path:'/orderSuccess?orderId=' + res.result.orderId
					})
				}
			})
		}
	}
}
</script>