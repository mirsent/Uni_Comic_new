<template>
	<view>
		<view class="tab">
			<view class="tab-cell" :class="{on: tabIndex == 1}" @tap="showPublish">
				创建的
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 2}" @tap="showLike">
				关注的
			</view>
		</view>
		<!-- 创建的 -->
		<view class="uni-list" v-show="tabIndex == 1">
			<view class="uni-list-cell" 
				v-for="(gather,index) in publishData" :key="index"
				@tap="goGatherDetail(gather)">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class="list">
						<view class="list-img">
							<image :src="gather.url_arr[0]" mode="widthFix"></image>
						</view>
						<view class="list-right">
							<view class="list-title text-ellipsis">
								{{gather.gather_title}}
							</view>
							<view class="list-brief">
								{{gather.publish_time}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 关注的 -->
		<view class="uni-list" v-show="tabIndex == 2">
			<view class="uni-list-cell" 
				v-for="(gather,index) in likeData" :key="index"
				@tap="goGatherDetail(gather)">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class="list">
						<view class="list-img">
							<image :src="gather.url_arr[0]" mode="widthFix"></image>
						</view>
						<view class="list-right">
							<view class="list-title text-ellipsis">
								{{gather.gather_title}}
							</view>
							<view class="list-brief">
								{{gather.like_number}}人关注 · {{gather.publisher}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				tabIndex: 1,
				readerInfo: [],
				publishData: [],
				likeData: []
			};
		},
		onLoad() {
			let readerInfo = service.getUsers();
			this.readerInfo = readerInfo;
			
			this.getGatherInfo()
		},
		methods: {
			showPublish() {
				this.tabIndex = 1
			},
			showLike() {
				this.tabIndex = 2
			},
			getGatherInfo() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/get_raeder_gather_info',
					method: 'GET',
					data: {
						reader_id: this.readerInfo.id
					},
					success: res => {
						let data = res.data.data
						this.publishData = data.publish
						this.likeData = data.like
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			goGatherDetail(e) {
				let detail = {
					gather_id: e.gather_id,
					title: e.gather_title
				}
				uni.navigateTo({
					url: "../gather-detail/gather-detail?detailData=" + JSON.stringify(detail)
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F0EFF4;
	}
	.tab {
		background-color: #FFF;
	}
	.uni-list-cell:after {
		background-color: #E8E8E8;
	}
	.list {
		display: flex;
	}
	.uni-navigate-right .list-img {
		width: 60px;
		height: 60px;
		overflow: hidden;
		display: flex;
		align-items: center;
	}
	.list-right {
		padding: 3px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.list-title {
		font-size: 32upx;
		max-width: 450upx;
	}
	.list-brief {
		font-size: 28upx;
		color: #959595;
	}
</style>
