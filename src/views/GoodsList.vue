<template>
<div>
	<nav-header></nav-header>
	<nav-bread><span>商品列表</span></nav-bread>
	<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
		xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<symbol id="icon-arrow-short" viewBox="0 0 25 32">
				<title>arrow-short</title>
				<path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
			</symbol>
		</defs>
	</svg>

	<div class="accessory-result-page accessory-page">
		<div class="container">
			<div class="filter-nav">
				<span class="sortby">排序:</span>
				<a href="javascript:void(0)" class="default" @click="defaultGoods" :class="{'cur':defaultChecked === 'default'}">默认</a>
				<a href="javascript:void(0)" class="price"  @click="sortGoods" :class="{'cur':defaultChecked === 'price'}">价格<svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg> </a>
				<a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
			</div>
			<div class="accessory-result">
				<div class="filter stopPop" id="filter" :class="{'filterby-show' : filterBy}">
					<dl class="filter-price">
						<dt>价格</dt>
						<dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
						<dd v-for="(price,index) in priceFilter">
							<a href="javascript:void(0)" :class="{'cur':priceChecked == index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
						</dd>
					</dl>
				</div>

				<div class="accessory-list-wrap">
					<div class="accessory-list col-4">
						<ul>
							<li v-for="(item,index) in goodsList">
								<div class="pic">
									<a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
								</div>
								<div class="main">
									<div class="name">{{item.productName}}</div>
									<div class="price">{{item.salePrice}}</div>
									<div class="btn-area">
										<a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="view-more-normal"
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="busy"
		infinite-scroll-distance="80">
		<img src="../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
	</div>

	<div class="md-overlay" v-show="overLay" @click="closePop"></div>

	<modal :mdShow="mdShow" v-on:close="closeModal">
		<p slot="message">
			请先登录后再加入购物车😄
		</p>
		<div slot="btnGroup">
			<a href="javascript:;" class="btn btn--m" @click="mdShow = false">关闭</a>
		</div>
	</modal>

	<modal :mdShow="mdShowCart" v-on:close="closeModal">
		<p slot="message">
			<svg class="icon-status-ok">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
			</svg>
			<span>加入购物车成功🙂</span>
		</p>
		<div slot="btnGroup">
			<a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
			<router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
		</div>
	</modal>

	<nav-footer></nav-footer>
</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import Modal from '@/components/Modal'
import axios from 'axios'

export default {
	data() {
		return {
			goodsList: [],
			sortFlag: true,
			page: 1,
			pageSize: 4,
			priceFilter: [{
				startPrice: '0',
				endPrice: '100'
			}, {
				startPrice: '100',
				endPrice: '500'
			}, {
				startPrice: '500',
				endPrice: '1000'
			}, {
				startPrice: '1000',
				endPrice: '3000'
			}],
			filterBy: false,
			overLay: false,
			busy: true,
			loading: false,
			priceChecked: 'all',
			defaultChecked: 'default',
			mdShow: false,
			mdShowCart: false
		}
	},
	components: {
		NavHeader,
		NavBread,
		NavFooter,
		Modal
	},
	mounted() {
		this.getGoodsList()
	},
	methods: {
		getGoodsList(flag) {
			var param = {
				page: this.page,
				pageSize: this.pageSize,
				sort: this.sortFlag ? 1 : -1,
				priceLevel: this.priceChecked
			}
			axios.get('/goods/list', {
				params: param
			}).then(response => {
				let res = response.data
				if (res.status === '0') {
					if (flag) {
						this.goodsList = this.goodsList.concat(res.result.list)
						if (res.result.count == 0) {
							this.busy = true
							this.loading = false
						} else {
							this.busy = false
							this.loading = true
						}
					} else {
						this.goodsList = res.result.list
						this.busy = false
						this.loading = true
					}
				} else {
					this.goodsList = []
				}
			})
		},

		loadMore() {
			this.busy = true
			setTimeout(() => {
				this.page++;
				this.getGoodsList(true)
			}, 1000)
		},

		sortGoods() {
			this.defaultChecked = 'price'
			this.sortFlag = !this.sortFlag
			this.page = 1
			this.getGoodsList()
		},

		defaultGoods() {
			this.defaultChecked = 'default'
			this.pageSize = 4
			this.getGoodsList()
		},

		setPriceFilter(index) {
			this.priceChecked = index
			this.page = 1
			this.getGoodsList()
		},

		showFilterPop() {
			this.filterBy = true;
			this.overLay = true;
		},

		closePop() {
			this.filterBy = false
			this.overLay = false
		},

		addCart(productId) {
			axios.post("/goods/addCart", {
				productId: productId
			}).then(response => {
				let res = response.data
				if (res.status === '0') {
					this.mdShowCart = true
				} else {
					this.mdShow = true
				}
			})
		},

		closeModal() {
			this.mdShow = false
			this.mdShowCart = false
		}
	}
}
</script>