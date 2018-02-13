<template>
	<div>
		<nav-header></nav-header>
		<nav-bread><span>购物车列表</span></nav-bread>
		<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
		xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
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
			<symbol id="icon-ok" viewBox="0 0 32 32">
				<title>ok</title>
				<path class="path1"
				d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
			</symbol>
		</defs>
	</svg>

	<div class="container">
		<div class="cart">
			<div class="item-list-wrap">
				<div class="cart-item">
					<div class="cart-item-head">
						<ul>
							<li>商品信息</li>
							<li>商品金额</li>
							<li>商品数量</li>
							<li>总金额</li>
							<li>编辑</li>
						</ul>
					</div>
					<ul class="cart-item-list">
						<li v-for="item in cartList">
							<div class="cart-tab-1">
								<div class="cart-item-check">
									<button href="javascipt:;" class="checkbox-btn item-check-btn" :class="{'check':item.checked === '1'}" @click="editCart('checked',item)">
										<svg class="icon icon-ok">
											<use xlink:href="#icon-ok"></use>
										</svg>
									</button>
								</div>
								<div class="cart-item-pic">
									<img v-lazy="'/static/'+item.productImage">
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
									<div class="select-self select-self-open">
										<div class="select-self-area">
											<a class="input-sub" @click="editCart('minus',item)">-</a>
											<input class="select-ipt" value="1" v-model="item.productNum" @change="inputValue(item)"></input>
											<a class="input-add" @click="editCart('add',item)">+</a>
										</div>
									</div>
								</div>
							</div>
							<div class="cart-tab-4">
								<div class="item-price-total">{{(item.salePrice*item.productNum) | currency('￥')}}</div>
							</div>
							<div class="cart-tab-5">
								<div class="cart-item-opration">
									<a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
										<svg class="icon icon-del">
											<use xlink:href="#icon-del"></use>
										</svg>
									</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="cart-foot-wrap">
				<div class="cart-foot-inner">
					<div class="cart-foot-l">
						<div class="item-all-check">
							<button @click="checkAll">
								<span class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
									<svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
								</span>
								<span>全选</span>
							</button>
						</div>
					</div>
					<div class="cart-foot-r">
						<div class="item-total">
							合计: <span class="total-price">{{totalPrice | currency('￥')}}</span>
						</div>
						<div class="btn-wrap">
							<a class="btn btn--red" :class="{'btn--dis':checkedCount === 0}" @click="checkOut">结算</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<nav-footer></nav-footer>

	<Modal :mdShow="delConfirm" @close="closeModal">
		<p slot='message'>你确定要删除此商品吗😘</p>
		<div slot="btnGroup">
			<a class="btn btn--m" href="javascript:;" @click="delCart">确认</a>
			<a class="btn btn--m" href="javascript:;" @click="delConfirm = false">取消</a>
		</div>
	</Modal>
</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import Modal from '@/components/Modal'
import axios from 'axios'
import {currency} from '@/util/currency'

export default {
	data() {
		return {
			cartList: [],
			delItem: {},
			delConfirm: false
		}
	},
	components: {
		NavHeader,
		NavBread,
		NavFooter,
		Modal
	},
	filters: {
		currency
	},
	computed: {
		checkAllFlag() {
			return this.checkedCount === this.cartList.length
		},
		checkedCount() {
			var i = 0;
			this.cartList.forEach(item => {
				if (item.checked === '1') i++
			})
			return i
		},
		totalPrice() {
			var money = 0
			this.cartList.forEach(item => {
				if (item.checked === '1') {
					money += parseFloat(item.salePrice) * parseInt(item.productNum)
				}
			})
			return money
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			axios.get('/users/cartList').then(response => {
				let res = response.data
				this.cartList = res.result
			})
		},

		delCartConfirm(item) {
			this.delItem = item
			this.delConfirm = true
		},

		closeModal() {
			this.delConfirm = false
		},

		delCart() {
			axios.post("/users/cartDel", {
				productId: this.delItem.productId
			}).then(response => {
				let res = response.data
				if (res.status === '0') {
					this.delConfirm = false
					this.init()
				}
			})
		},

		edit(item) {
			axios.post("/users/cartEdit", {
				productId: item.productId,
				productNum: item.productNum,
				checked: item.checked
			}).then(response => {
				let res = response.data
				if (res.status === '0') {}
			})
		},
		inputValue(item) {
			this.edit(item)
		},
		editCart(flag, item) {
			if (flag === 'add') {
				item.productNum++
			} else if (flag === 'minus') {
				if (item.productNum <= 1) {
					return
				}
				item.productNum--;
			} else {
				item.checked = item.checked === "1" ? '0' : '1';
			}

			this.edit(item)
		},

		checkAll() {
			var flag = !this.checkAllFlag
			this.cartList.forEach(item => {
				item.checked = flag ? '1' : '0'
			})
			axios.post("/users/editCheckAll", {
				checkAll: flag
			}).then(response => {
				let res = response.data
				if (res === '0') {}
			})
		},

		checkOut() {
			if (this.checkedCount > 0) {
				this.$router.push({
					path: "/address"
				})
			}
		}
	}
}
</script>