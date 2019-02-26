<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(wish,index) in wishData" :key="index">
				<view class="uni-list-cell-navigate">
					<view class="list-title">
						{{wish.wish_title}} <text v-show="wish.status == 2" class="success">（已上架）</text>
					</view>
					<view class="list-btn">
						<button type="warn" :disabled="wish.is_like" @tap="wishLike(wish.id)">
							<image src="../../static/img/zan_white.png" mode=""></image>
							{{wish.number_like}}
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-group">
			<button type="primary" @tap="goWishAdd">我想看</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				readerInfo: [],
				wishData: []
			};
		},
		onLoad() {
			let readerInfo = service.getUsers();
			this.readerInfo = readerInfo;
		},
		onShow() {
			this.getWish()
		},
		methods: {
			getWish() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/get_wish',
					method: 'GET',
					data: {
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.wishData = res.data.data
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			wishLike(e) {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/wish_like',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						reader_id: this.readerInfo.id,
						wish_id: e
					},
					success: res => {
						this.getWish()
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			goWishAdd() {
				uni.navigateTo({
					url: '../wish-add/wish-add'
				})
			}
		}
	}
</script>

<style>
	.list-title {
		font-size: 32upx;
	}
	.list-btn button{
		font-size: 24upx;
		display: flex;
		align-items: center;
		padding: 4px 8px;
		line-height: 1;
	}
	.list-btn image {
		width: 18px;
		height: 18px;
	}
	.success {
		color: #1AAD19;
	}
	
	.btn-group {
		position: fixed;
		bottom: 10px;
		left: 20px;
		right: 20px;
	}
	.btn-group button {
		background-color: #D1513B;
	}
</style>
