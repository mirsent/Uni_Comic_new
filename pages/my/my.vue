<template>
	<view>

		<view class="info">
			<view class="top">
				<image src="../../static/img/timg2.jpg"></image>
			</view>
			<view class="bottom">
				Mirse
				<view class="notice">
					<image src="../../static/img/notice.png"></image>
				</view>
			</view>
		</view>

		<view class="tab">
			<view class="tab-cell" :class="{on: tabIndex == 1}" @tap="showHistory">
				浏览历史
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 2}" @tap="showCollect">
				我的收藏
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 3}" @tap="showPersonal">
				个人中心
			</view>
		</view>

		<!-- 浏览历史 -->
		<view class="list history" v-show="tabIndex == 1">
			<view class="list-item" v-for="(comic,index) in historyData" :key="index" @tap="reading(comic)">
				<view class="list-cover">
					<image :src="comic.head" mode="widthFix"></image>
				</view>
				<view class="list-content">
					<view class="title">
						{{comic.title}}
					</view>
					<view class="content">
						<view class="left">
							<view class="brief">
								第{{comic.chapter_name}}章 {{comic.chapter_title?comic.chapter_title:''}} <text>已读{{comic.rate}}%</text>
							</view>
							<view class="progress">
								<progress :percent="comic.rate" stroke-width="1" activeColor="#D1513B" backgroundColor="#DDD" />
							</view>
						</view>
						<view class="right">
							<button type="primary">续看</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 我的收藏 -->
		<view class="list collect" v-show="tabIndex == 2">
			<view class="list-item">
				<view class="list-cover">
					<image src="../../static/img/head.jpg" mode="widthFix"></image>
				</view>
				<view class="list-content">
					<view class="title">
						名侦探柯南
					</view>
					<view class="content">
						<view class="left">
							<view class="brief">
								有<text class="em">20 </text>章未读
							</view>
							<view class="brief">
								更新至：第30章 战后
							</view>
						</view>
						<view class="right">
							<button type="primary">续看</button>
						</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="list-cover">
					<image src="../../static/img/head.jpg" mode="widthFix"></image>
				</view>
				<view class="list-content">
					<view class="title">
						名侦探柯南
					</view>
					<view class="content">
						<view class="left">
							<view class="brief">
								有<text class="em">20 </text>章未读
							</view>
							<view class="brief">
								更新至：第30章 战后
							</view>
						</view>
						<view class="right">
							<button type="primary">续看</button>
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
				openid: '',
				historyData: []
			};
		},
		onLoad() {
			let _this = this;
			let readerInfo = service.getUsers();
			this.openid = readerInfo.openid;
			wx.getSetting({
				// 检查权限
				success (res){
					if (res.authSetting['scope.userInfo']) {
			            _this.authed = true;
						_this.readerInfo = readerInfo;
					}
				}
			})
			this.getHistory()
		},
		methods: {
			getHistory() {
			    uni.request({
			    	url: this.$requestUrl+'Comic/get_history_info',
			    	method: 'GET',
			    	data: {
			            openid: this.openid
			        },
			    	success: res => {
			            this.historyData = res.data.data;
			        },
			    	fail: () => {},
			    	complete: () => {
			            uni.hideLoading();
			            uni.stopPullDownRefresh();
			        }
			    });
			},
			reading(e) {
			    console.log(e);
				uni.request({
					url: this.$requestUrl+'Comic/get_reading_chapter',
					method: 'GET',
					data: {
						comic_id: e.comic_id,
						openid: this.openid
					},
					success: res => {
						let detail = {
							comic_id: e.comic_id,
							title: e.title,
							cover: e.cover,
							chapter: res.data.data
						}
						uni.navigateTo({
							url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			showHistory() {
				this.tabIndex = 1;
			},
			showCollect() {
				this.tabIndex = 2;
			},
			showPersonal() {
				this.tabIndex = 3;
			}
		}
	}
</script>

<style>
	.list {
		padding: 20px;
	}

	.list-item {
		display: flex;
		margin-bottom: 25px;
	}

	.list-cover {
		width: 80px;
		height: 80px;
		overflow: hidden;
		margin-right: 20px;
	}

	.list-cover image {
		border-radius: 5px;
	}

	.list-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5px 0;
	}

	.list-content .title {
		font-size: 32upx;
	}

	.list-content .content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-content .left {
		flex: 1;
	}

	.list-content .brief {
		font-size: 24upx;
		color: #707070;
	}

	.list-content .brief+.brief,
	.list-content .progress {
		margin-top: 8px;
	}

	.list-content .brief text {
		color: #DDD;
		margin-left: 5px;
	}
	.list-content .brief .em{
		color: #D1513B;
		margin-left: 0;
	}

	.list-content .right button {
		font-size: 20upx;
		width: 30px;
		height: 16px;
		line-height: 16px;
		background-color: #D1513B;
		margin: 0;
		margin-left: 10px;
		padding: 0;
	}


	.info {
		background-color: #3C424B;
		text-align: center;
	}

	.info .top {
		padding: 10px 0;
	}

	.info .top image {
		width: 76px;
		height: 76px;
		border-radius: 50%;
	}

	.info .bottom {
		font-size: 36upx;
		color: #F7DEC9;
		margin-bottom: 15px;
		position: relative;
		display: inline-block;
	}

	.info .bottom .notice {
		position: absolute;
		right: -40px;
		bottom: -4px;
	}

	.info .bottom .notice image {
		width: 15px;
		height: 18px;
	}
</style>
