<template>
	<div>
		<nav-header></nav-header>
		<nav-bread><span>收货地址</span></nav-bread>

		<div class="checkout-page">
			<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<defs>
					<symbol id="icon-add" viewBox="0 0 31 32">
						<title>add</title>
						<path class="path1" d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"></path>
					</symbol>
					<symbol id="icon-del" viewBox="0 0 32 32">
						<title>delete</title>
						<path class="path1"
						d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
						<path class="path2"
						d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
						<path class="path3"
						d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
						<path class="path4"
						d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
					</symbol>
				</defs>
			</svg>
			<div class="container">
				<div class="checkout-addr">
					<div class="check-step">
						<ul>
							<li class="cur">地址确认</li>
							<li>查看订单</li>
							<li>支付</li>
							<li>订单确认</li>
						</ul>
					</div>

					<div class="page-title-normal checkout-title">
						<h2><span>配送地址</span></h2>
					</div>
					<div class="addr-list-wrap">
						<div class="addr-list">
							<ul>
								<li v-for="(item,index) in addressListFilter" :class="{'check' : addressChecked === index}" @click="addressChecked = index; selectedAddrId = item.addressId">
									<dl>
										<dt>{{item.userName}}</dt>
										<dd class="address">{{item.streetName}}</dd>
										<dd class="tel">{{item.tel}}</dd>
									</dl>
									<div class="addr-opration addr-del">
										<a href="javascript:;" class="addr-del-btn" @click="delConfirm(item.addressId)">
											<svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
										</a>
									</div>
									<div class="addr-opration addr-set-default">
										<a href="javascript:;" class="addr-set-default-btn" v-if='!item.isDefault' @click="setDefault(item.addressId)"><i>设为默认</i></a>
									</div>
									<div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
								</li>
								<li class="addr-new">
									<div class="add-new-inner">
										<i class="icon-add">
											<svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
										</i>
										<p>添加新地址</p>
									</div>
								</li>
							</ul>
						</div>

						<div class="shipping-addr-more">
							<a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand" :class="{'open':limit>3}">
								<i class="i-up-down">
									<i class="i-up-down-l"></i>
									<i class="i-up-down-r"></i>
								</i>
							</a>
						</div>
					</div>

					<div class="next-btn-wrap">
						<router-link class="btn btn--m btn--red" :to="{path:'order',query:{'addressId':selectedAddrId}}">提交</router-link>
					</div>
				</div>
			</div>
		</div>

		<nav-footer></nav-footer>

		<modal :mdShow="mdShow" @close="closeModal">
			<p slot="message">
				您是否要删除此地址😭
			</p>
			<div slot="btnGroup">
				<a class="btn btn--m" href="javascript:;" @click="delAddress">确认</a>
				<a class="btn btn--m" href="javascript:;" @click="closeModal">取消</a>
			</div>
		</modal>
	</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import Modal from '@/components/Modal'
import axios from  'axios'

export default {
	data() {
		return {
			addressList: [],
			limit: 2,
			addressChecked: 0,
			mdShow: false,
			addressId: '',
			selectedAddrId:''
		}
	},
	components: {
		NavHeader,
		NavBread,
		NavFooter,
		Modal
	},
	computed: {
		addressListFilter() {
			return this.addressList.slice(0, this.limit)
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			axios.get("/users/address").then(response => {
				let res = response.data
				this.addressList = res.result
			})
		},

		expand() {
			if (this.limit === 2) {
				this.limit = this.addressList.length
			} else {
				this.limit = 2
			}
		},

		setDefault(addressId) {
			axios.post("/users/setDefault", {
				addressId: addressId
			}).then(response => {
				let res = response.data
				if (res.status === '0') {
					this.init()
				}
			})
		},


		closeModal() {
			this.mdShow = false
		},
		delConfirm(addressId) {
			this.mdShow = true
			this.addressId = addressId
		},
		delAddress() {
			axios.post("/users/delAddress", {
				addressId: this.addressId
			}).then(response => {
				let res = response.data
				if (res.status === '0') {
					this.mdShow = false
					this.init()
				}
			})
		}
	}
}
</script>