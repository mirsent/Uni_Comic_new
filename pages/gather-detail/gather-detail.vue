<template>
	<view class="wrap">
		<view class="title">
			{{gatherInfo.gather_title}}
			<image class="like-icon" src="../../static/img/collect_on.png"
				v-if="gatherInfo.is_like" 
				@tap="cancelLikeGather(gatherInfo.id)">
			</image>
			<image class="like-icon" src="../../static/img/collect_red.png"
				 v-else
				 @tap="likeGather(gatherInfo.id)">
			</image>
		</view>
		<view class="brief">
			<text>{{gatherInfo.nickname}}</text>
			<text>{{gatherInfo.publish_time}}</text>
		</view>
		<view class="imgs">
			<image :src="url" mode="widthFix" v-for="(url,index) in gatherInfo.url" :key="index"></image>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				readerInfo: [],
				gatherInfo: []
			};
		},
		onLoad(e) {
			let readerInfo = service.getUsers();
			this.readerInfo = readerInfo;
			
			let info = JSON.parse(e.detailData);
			uni.setNavigationBarTitle({
				title: info.title
			})
			this.getGather(info.gather_id)
		},
		methods: {
			getGather(id) {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/get_gather_detail',
					method: 'GET',
					data: {
						gather_id: id,
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.gatherInfo = res.data.data
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			likeGather(e) {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/like_gather',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						gather_id: e,
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.getGather(this.gatherInfo.id)
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			cancelLikeGather(e) {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/cancel_like_gather',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						gather_id: e,
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.getGather(this.gatherInfo.id)
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
		}
	}
</script>

<style>
	.title {
		font-size: 32upx;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.like-icon {
		width: 16px;
		height: 16px;
	}
	.brief {
		font-size: 24upx;
		color: #666;
		margin-bottom: 15px;
		padding-bottom: 15px;
		border-bottom: 1px solid #F1F1F1;
	}
	.brief text + text {
		margin-left: 10px;
	}
</style>
