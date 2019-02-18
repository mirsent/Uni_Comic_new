<template>
	<view class="page">
		<view class="tab">
			<view class="tab-cell" :class="{on: tabIndex == 1}" @tap="showFind">
				发现
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 2}" @tap="showCollect">
				画册
			</view>
		</view>

		<!-- 发现 -->
		<view v-show="tabIndex == 1" class="wrap find">
			<view class="loading" v-if="loading">
				<image src="../../static/img/loading.gif" mode="widthFix"></image>
			</view>
			<scroll-view id="scrollFind" scroll-y :style="{height: scrollHeightFind+'px'}" @touchstart="startFind" @touchend="moveFind">
				<!-- 最新漫画 -->
				<view class="card card-2" @tap="goInfo(newComicInfo)">
					<view class="cover">
						<image :src="newComicInfo.cover"></image>
					</view>
					<view class="content">
						<view class="title text-2-ellipsis">
							{{newComicInfo.title}}
						</view>
						<view class="brief text-2-ellipsis">
							<rich-text :nodes="newComicInfo.brief"></rich-text>
						</view>
					</view>
				</view>
				<!-- 推荐 -->
				<view class="recommend" v-for="(comic,index) in recommendComicData" :key="index" @tap="goInfo(comic)">
					<view class="card cover">
						<image :src="comic.cover" mode="widthFix"></image>
					</view>
					<view class="body">
						<view class="head">
							<image :src="comic.head"></image>
						</view>
						<view class="content">
							<view class="top">
								<view class="title">
									{{comic.title}}
								</view>
								<view class="view">
									<image src="../../static/img/fire.png"></image>
									<text>{{comic.popularity}}</text>
								</view>
							</view>
							<view class="brief text-ellipsis">
								{{comic.brief}}
							</view>
						</view>
					</view>
				</view>
				<!-- 专题 -->
				<view v-for="(comic,index) in subjectComicData" :key="index">
					<view class="card subject">
						<view class="content">
							<view class="top">
								<view class="top-box">
									<image v-for="(img,i) in comic.top" :key="i" :src="img"></image>
								</view>
							</view>
							<view class="bottom">
								<view class="top-box" style="margin-left: -100upx;">
									<image v-for="(img,i) in comic.bottom" :key="i" :src="img"></image>
								</view>
							</view>
						</view>
					</view>
					
					<view class="subject-title">
						专题推荐：{{comic.subject_name}}
					</view>
				</view>
				<!-- 最近更新 -->
				<view class="item update">
					<view class="item-title">
						最近更新
					</view>
					<view class="item-list">
						<view class="cell" v-for="(comic, index) in newComicData" :key="index" @tap="goInfo(comic)">
							<view class="cell-brief">
								{{comic.date}}
							</view>
							<view class="cell-img">
								<image :src="comic.head"></image>
							</view>
							<view class="cell-title text-ellipsis">
								{{comic.title}}
							</view>
						</view>
					</view>
				</view>
				<!-- 猜你喜欢 -->
				<view class="item like">
					<view class="item-title">
						猜你喜欢
					</view>
					<view class="item-list">
						<view class="cell" v-for="(comic,index) in likeComicData" :key="index" @tap="goInfo(comic)">
							<view class="cell-img">
								<image :src="comic.head"></image>
							</view>
							<view class="cell-title text-ellipsis">
								{{comic.title}}
							</view>
						</view>
					</view>
					<view class="btn-group">
						<button @tap="goType">查看更多</button>
						<button @tap="getLikeComic">
							<uni-icon size="14" type="loop" color="#7F7F7F"></uni-icon>
							换一换
						</button>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 画册 -->
		<view v-show="tabIndex == 2" class="wrap">
			
			<view class="loading" v-if="loading">
				<image src="../../static/img/loading.gif" mode="widthFix"></image>
			</view>
			
			<view class="btn-box">
				<button type="primary" @tap="goGatherAdd">发布</button>
			</view>
			
			<scroll-view id="scrollCollect" scroll-y :style="{height: scrollHeightCollect+'px'}" @touchstart="startCollect" @touchend="moveCollect">
				<view class="collect">
					<view class="left">
						<view class="item" v-for="(gather,index) in gatherData.left" :key="index"
							@tap="goGatherDetail(gather)">
							<image class="item-img" :src="gather.url" mode="widthFix"></image>
							<view class="item-info">
								<view class="item-title">
									{{gather.gather_title}}
								</view>
								<view class="item-footer">
									<view class="info-box">
										<image class="info-head" :src="gather.head"></image>
										<text class="info-name">{{gather.nickname}}</text>
									</view>
									<view class="like-box" @tap="likeGather(gather.id)">
										<image v-if="gather.is_like" class="like-icon" src="../../static/img/collect_on.png"></image>
										<image v-else class="like-icon" src="../../static/img/collect_red.png"></image>
										<text>{{gather.likes}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="item" v-for="(gather,index) in gatherData.right" :key="index"
							@tap="goGatherDetail(gather)">
							<image class="item-img" :src="gather.url" mode="widthFix"></image>
							<view class="item-info">
								<view class="item-title">
									{{gather.gather_title}}
								</view>
								<view class="item-footer">
									<view class="info-box">
										<image class="info-head" :src="gather.head"></image>
										<text class="info-name">{{gather.nickname}}</text>
									</view>
									<view class="like-box">
										<image class="like-icon" src="../../static/img/collect_on.png"
											v-if="gather.is_like" 
											@tap="cancelLikeGather(gather.id)">
										</image>
										<image class="like-icon" src="../../static/img/collect_red.png"
											 v-else
											 @tap="likeGather(gather.id)">
										</image>
										<text>{{gather.likes}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		
		<button class="login-btn" open-type="getUserInfo" v-if="!authed" @getuserinfo="login"></button>
	
	</view>
</template>

<script>
    import service from '../../service.js';
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				tabIndex: 1,
                authed: false,
				scrollTop: 0,
				scrollHeightFind: '',
				scrollHeightCollect: '',
				loading: false,
				
				scrollStartFindY: '',
				scrollStartFindTop: '',
				scrollStartCollectY: '',
				scrollStartCollectTop: '',
				
				readerInfo: [],
				newComicData: [],
				newComicInfo: [],
				recommendComicData: [],
				subjectComicData: [],
				likeComicData: [],
				gatherData: []
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			let _this = this;
			wx.getSetting({
				success (res){
					if (res.authSetting['scope.userInfo']) {
						_this.authed = true;
					}
				}
			})
			this.code_2_session();
			// #endif
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					let windowHeight = res.windowHeight;
					
					let query = uni.createSelectorQuery();
					query.select(".tab").boundingClientRect();
					query.select(".btn-box").boundingClientRect();
					query.exec(data => {
						let tab = data[0];
						let btn = data[1];
						this.scrollHeightCollect = windowHeight - tab.height - btn.height - 45;
						this.scrollHeightFind = windowHeight - tab.height - 30;
						this.scrollTop = 200;
					});
				}
			})
		},
		methods: {
			startFind(e){
				let _this = this;
				_this.scrollStartFindY = e.clientY;
				uni.createSelectorQuery().select('#scrollFind').fields({
					scrollOffset: true,
					size: true
				}, data => {
					_this.scrollStartFindTop = data.scrollTop;
				}).exec();
			},
			moveFind(e) {
				let scrollEndY = e.mp.changedTouches[0].clientY
				if (this.scrollStartFindTop == 0 && scrollEndY - this.scrollStartFindY > 20) {
					this.loading = true;
					this.getData()
				}
			},
			startCollect(e){
				let _this = this;
				_this.scrollStartCollectY = e.clientY;
				uni.createSelectorQuery().select('#scrollCollect').fields({
					scrollOffset: true,
					size: true
				}, data => {
					_this.scrollStartCollectTop = data.scrollTop;
				}).exec();
			},
			moveCollect(e) {
				let scrollEndY = e.mp.changedTouches[0].clientY
				if (this.scrollStartCollectTop == 0 && scrollEndY - this.scrollStartCollectY > 20) {
					this.loading = true;
					this.getGather()
				}
			},
			code_2_session() {
				uni.showLoading();
			    uni.login({
			    	provider: 'weixin',
			    	success: res => {
			            uni.request({
			            	url: this.$requestUrl+'Comic/code_2_session',
			            	method: 'POST',
			                header: {
			                	'content-type': 'application/x-www-form-urlencoded'
			                },
			            	data: {
			                    js_code: res.code,
			                    proxy_openid: this.proxyOpenid
			                },
			            	success: res => {
			                    let readerInfo = res.data.data;
			                    service.addUser(readerInfo);
			                    this.readerInfo = readerInfo;
								
								this.getData()
			                },
			            	fail: () => {},
			            	complete: () => {
								uni.hideLoading()
							}
			            });
			        }
			    });
			},
			login(e) {
			    if (e.detail.errMsg == 'getUserInfo:ok') {
			    	uni.request({
			    		url: this.$requestUrl+'Comic/edit_reader',
			    		method: 'POST',
			    		header: {
			    			'content-type': 'application/x-www-form-urlencoded'
			    		},
			    		data: {
			    			openid: this.openid,
			    			nickname: e.detail.userInfo.nickName,
			    			head: e.detail.userInfo.avatarUrl
			    		},
			    		success: res => {
			    			this.authed = true;
			    			this.readerInfo = res.data.data;
			    			uni.showToast({
			    				title: '登录成功',
			    				duration: 1500
			    			});
			    		}
			    	});
			    }
			},
			showFind() {
				this.tabIndex = 1;
			},
			showCollect() {
				this.getGather()
				this.tabIndex = 2;
			},
			getLikeComic() {
				uni.request({
					url: this.$requestUrl+'Comic/get_like_comic',
					method: 'GET',
					data: {
						openid: this.readerInfo.openid
					},
					success: res => {
						this.likeComicData = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getData() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Api/get_index_data',
					method: 'GET',
					data: {
						openid: this.readerInfo.openid
					},
					success: res => {
						let info = res.data.data;
						this.newComicInfo = info.new[0];
						this.newComicData = info.new;
						this.recommendComicData = info.recommend;
						this.subjectComicData = info.subject;
						this.likeComicData = info.like;
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
						this.loading = false
					}
				});
			},
			getGather() {
				uni.request({
					url: this.$requestUrl+'Reader/get_gather',
					method: 'GET',
					data: {
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.gatherData = res.data.data
					},
					fail: () => {},
					complete: () => {
						this.loading = false
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
						this.getGather()
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
						this.getGather()
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			goInfo(e) {
				let detail = {
					comic_id: e.id,
					title: e.title
				}
				uni.navigateTo({
					url: "../comic-info/comic-info?detailData=" + JSON.stringify(detail)
				})
			},
			goGatherDetail(e) {
				let detail = {
					gather_id: e.id,
					title: e.gather_title
				}
				uni.navigateTo({
					url: "../gather-detail/gather-detail?detailData=" + JSON.stringify(detail)
				})
			},
			goType() {
				uni.switchTab({
					url: "../type/type"
				})
			},
			goGatherAdd() {
				uni.navigateTo({
					url: "../gather-add/gather-add"
				})
			}
		}
	}
</script>

<style>
	.loading {
		text-align: center;
		margin-bottom: 10px;
		transition: all .5s;
	}
	.loading image {
		width: 80px;
	}
	/* 卡片 */
	.card {
		box-shadow: 2px 2px 6px rgba(0, 0, 0, .3);
		border-radius: 18px;
		overflow: hidden;
		margin-bottom: 20px;
	}

	.card .cover {
		overflow: hidden;
	}

	.card .cover image {
		/* width: 100%; */
		height: 100%;
	}

	.card .content {
		padding: 15px;
	}

	.card .title {
		margin-bottom: 8px;
	}

	.card .brief {
		line-height: 1.5;
		font-size: 32upx;
	}

	/* card-1 */
	.card-1 {
		height: 360px;
		position: relative;
	}

	.card-1 .cover {
		height: 100%;
	}

	.card-1 .content {
		height: 100%;
		color: #FFF;
		position: absolute;
		top: 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: linear-gradient(transparent, rgba(0, 0, 0, .4));
	}

	.card-1 .title {
		font-size: 52upx;
	}

	/* card-2 */
	.card-2 .cover {
		height: 220px;
	}

	.card-2 .cover image {
		width: 100%;
	}

	.card-2 .title {
		font-size: 42upx;
	}

	.card-2 .brief {
		color: #A6A6AA;
	}

	/* card-3 */
	.card-3 {
		position: relative;
	}

	.card-3 .cover {
		height: 300px;
	}

	.card-3 .title {
		font-size: 52upx;
		color: #FFF;
		background-color: rgba(0, 0, 0, .05);
		padding: 5px 15px;
		position: absolute;
		left: 0;
		right: 0;
		top: 257px;
	}

	/* 推荐 */
	.recommend {
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #EAEAEA;
	}

	.recommend .cover {
		height: 140px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.recommend .body {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.recommend .head {
		height: 120upx;
	}

	.recommend .head image {
		width: 120upx;
		height: 120upx;
		border-radius: 10px;
	}

	.recommend .content {
		width: 540upx;
	}

	.recommend .content .top {
		display: flex;
		justify-content: space-between;
	}

	.recommend .content .title {
		font-size: 36upx;
		margin-bottom: 5px;
	}

	.recommend .content .view {
		font-size: 28upx;
		display: flex;
		align-items: center;
	}

	.recommend .content .view image {
		width: 15px;
		height: 15px;
	}

	.recommend .content .view text {
		color: #F3705A;
		margin: 0 5px;
	}

	.recommend .content .brief {
		color: #666;
		font-size: 32upx;
	}

	/* 专题 */
	@keyframes marque-animation {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-138%);
		}
	}

	.subject .content {
		animation: marque-animation 50s linear infinite;
	}

	.subject .top {
		margin-bottom: 5px;
	}

	.top-box {
		white-space: nowrap;
	}

	.top-box image {
		width: 210upx;
		height: 210upx;
		border-radius: 16px;
		margin-right: 30upx;
	}

	.subject-title {
		font-size: 36upx;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #EAEAEA;
	}

	/* 列表 */
	.find .item {
		margin-bottom: 20px;
	}

	.find .item+.item {
		padding-top: 20px;
		border-top: 1px solid #EAEAEA;
	}

	.find .item-title {
		font-size: 36upx;
		margin-bottom: 15px;
	}

	.find .item-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cell-img image {
		border-radius: 5px;
		margin: 3px 0;
	}

	.cell-brief {
		font-size: 28upx;
		color: #939393;
	}

	.cell-title {
		font-size: 28upx;
		color: #666;
		max-width: 200upx;
	}

	.update .cell-img image {
		width: 100upx;
		height: 100upx;
	}
	
	.update .cell-title {
		max-width: 120upx;
	}

	.like .cell-img image {
		width: 200upx;
		height: 200upx;
	}

	.btn-group {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}

	.btn-group button {
		font-size: 28upx;
		width: 45%;
		height: 30px;
		line-height: 30px;
		color: #7F7F7F;
		background-color: #EAEAEA;
		margin: 0;
	}

	button:after {
		border: 0;
	}
	
	/* 画册 */
	.collect {
		display: flex;
		justify-content: space-between;
	}
	
	.collect .left,
	.collect .right {
		width: 48.5%;
	}
	
	.collect .item {
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 10px;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, .3);
	}
	
	.collect .item-info {
		padding: 8px;
	}
	
	.collect .item-title {
		font-size: 28upx;
		margin-bottom: 5px;
	}
	
	.collect .item-footer {
		display: flex;
		justify-content: space-between;
	}
	
	.collect .info-box,
	.collect .like-box {
		font-size: 22upx;
		display: flex;
		align-items: center;
	}
	
	.collect .info-box .info-head,
	.collect .like-box .like-icon {
		width: 16px;
		height: 16px;
		margin-right: 5px;
	}
	
	.collect .info-box .info-head {
		border-radius: 50%;
	}
	
	.btn-box {
		margin-bottom: 10px;
	}
	
	.btn-box button{
		font-size: 28upx;
		background-color: #D1513B;
	}
</style>
