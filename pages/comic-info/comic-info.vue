<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="comic.cover" mode="aspectFill"></image>
			<view class="banner-title">{{comic.title}}</view>
			<view class="banner-info">
				<view class="banner-type">
					<view class="type-item" v-for="(type,index) in comic.types" :key="index">{{type}}</view>
				</view>
				<view class="banner-status">{{comic.s_serial_name}}/更新至{{comic.total_chapter}}话</view>
			</view>
		</view>

		<view class="func">
			<view class="func-item">
				<view class="label" @tap="cancelCollect" v-if="comic.is_collect == 1">
					<image src="../../static/img/collect_on.png" class="icon"></image>
					<view class="title">已收藏</view>
				</view>
				<view class="label" @tap="collect" v-else>
					<image src="../../static/img/collect.png" class="icon"></image>
					<view class="title">收藏</view>
				</view>
				<view class="label" @tap="cancelLike" v-if="comic.is_like == 1">
					<image src="../../static/img/zan_on.png" class="icon"></image>
					<view class="title">已点赞</view>
				</view>
				<view class="label" @tap="like" v-else>
					<image src="../../static/img/zan.png" class="icon"></image>
					<view class="title">点赞</view>
				</view>
			</view>
			<view class="func-item">
				<view class="btn" @tap="reading">
					<image src="../../static/img/book.png" class="icon"></image>
					<view class="title">开始阅读</view>
				</view>
			</view>
		</view>

		<view class="tabbar">
			<view class="tabbar-item" :class="{on:isDetail}" @tap="showDetail">详情</view>
			<view class="tabbar-item" :class="{on:isChapter}" @tap="showChapter">选集</view>
		</view>

		<view class="detail" v-if="isDetail">
			<view class="body">
				<view class="label">作品简介</view>
				<view class="info">
					<rich-text :nodes="comic.brief" class="rich"></rich-text>
				</view>
				<view class="status">
					<view class="status-item">
						<view class="title">{{comic.popularity}}</view>
						<view>人气值</view>
					</view>
					<view class="status-item">
						<view class="title">{{comic.collection}}</view>
						<view>收藏人数</view>
					</view>
					<view class="status-item">
						<view class="title">{{comic.heat}}</view>
						<view>点赞人数</view>
					</view>
				</view>
			</view>
			
			<!-- 评论 -->
			<view class="comment">
				<view class="body">
					<view class="comment-header">
						<view class="title">评论({{commentData.count}})</view>
						<view class="write" @tap="goComment">
							写评论
						</view>
					</view>
					<view class="coment-body">
						<view class="grace-comment">
							<view class="comment-item" v-for="(comment, index) in commentData.comment" :key="index">
								
								<view class="grace-comment-list">
									<view class="grace-comment-face">
										<image :src="comment.head" mode="widthFix"></image>
									</view>
									<view class="grace-comment-body">
										<view class="grace-comment-name">
											{{comment.nickname}}
										</view>
										<view class="grace-comment-date">
											{{comment.comment_time}}
										</view>
										<view class="grace-comment-content">{{comment.comment_content}}</view>
										<view class="grace-comment-footer">
											<text @tap="reply(comment)">回复</text>
										</view>
									</view>
								</view>
								
								<view class="grace-comment-sub">
									<view class="grace-comment-list" v-for="(c,i) in comment.sub" :key="i">
										<view class="grace-comment-face">
											<image :src="c.head" mode="widthFix"></image>
										</view>
										<view class="grace-comment-body">
											<view class="grace-comment-name">
												{{c.nickname}}
											</view>
											<view class="grace-comment-date">
												{{c.comment_time}}
											</view>
											<view class="grace-comment-content">
												<text v-if="i != 0">回复{{c.replyname}}：</text>
												{{c.comment_content}}
											</view>
											<view class="grace-comment-footer">
												<text @tap="reply(c)">回复</text>
											</view>
										</view>
									</view>
								</view>
								
							</view>
							
                            <view class="grace-comment-list" v-if="commentData.length == 0">
                                <view class="grace-comment-content">暂无评论...</view>
                            </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 回复模板 -->
		<view class="comment-template" v-if="isReplyTemplate" @tap="cancleReply">
			<view class="comment-body" @tap.stop="">
				<input type="text" value="" :placeholder="replyWho" class="comment-input" @input="commentChange" />
				<text class="comment-btn" @tap="confirmReply">发表</text>
			</view>
		</view>

		<view class="body" v-if="isChapter">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in chapterData" :key="index" @tap="readingChoose(item)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.chapter_cover" v-if="item.chapter_cover" mode="aspectFill"></image>
						<image class="uni-media-list-logo" src="../../static/img/place.png" mode="scaleToFill" v-else></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">
								<view>{{item.catalog_name}}</view>
								<image v-if="item.is_fee" src="../../static/img/fee.png"></image>
							</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								<view>{{item.create_at}}</view>
								<view class="popular">
									<image src="../../static/img/see.png"></image>
									<view>{{item.popularity}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
        <view class="go-top" v-show="isToUp" @tap="goTop">
        	<image src="../../static/img/top.png"></image>
        </view>

		<button class="login-btn" open-type="getUserInfo" v-if="!authed" @getuserinfo="login"></button>
	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		data() {
			return {
				authed: false,

				// 分享章节封面
				shareChapter: '',
				shareCover: '',
				needShare: '',

                comicId: '',
				openid: '',
				isDetail: true,
				isChapter: false,
				comic: {},
				isChapterLoad: false,
				isToUp: false,
				chapterData: [],
                commentData: [],
                
                isProxy: '',
                proxyOpenid: '',
				
				// 回复
				isReplyTemplate: false,
				comment: '',
				replyParent: [],
				replyWho: ''
			};
		},
		onLoad(e) {
			uni.showLoading();
			let _this = this;

            // #ifdef MP-WEIXIN
            wx.getSetting({
            	success(res) {
            		if (res.authSetting['scope.userInfo']) {
            			_this.authed = true;
            		}
            	}
            })
            // #endif

			let readerInfo = service.getUsers();
			this.openid = readerInfo.openid;
            this.isProxy = readerInfo.is_proxy;

			let info = JSON.parse(e.detailData);
            this.comicId = info.comic_id;
            if (info.proxy_openid) {
            	this.proxyOpenid = info.proxy_openid;
            }
			uni.setNavigationBarTitle({
				title: info.title
			})

			this.getComicInfo();
		},
        onShow() {
			// 评论内容
        	this.getCommentInfo();
        },
        onPageScroll(e) {
            if (this.isToUp == false && e.scrollTop > 150) {
            	this.isToUp = true;
            }
            if (this.isToUp == true && e.scrollTop < 150) {
            	this.isToUp = false;
            }
        },
		methods: {
			login(e) {
				if (e.detail.errMsg == 'getUserInfo:ok') {
					uni.login({
						provider: 'weixin',
						success: res => {
							uni.request({
								url: this.$requestUrl+'Comic/code_2_session',
								method: 'GET',
								data: {
									js_code: res.code,
                                    proxy_openid: this.proxyOpenid
								},
								success: res => {
									let readerInfo = res.data.data;
									service.addUser(readerInfo);
									this.editReader(e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl);
								},
								fail: () => {},
								complete: () => {}
							});
						}
					});
				}
			},
			editReader(nickName, avatarUrl) {
				uni.request({
					url: this.$requestUrl+'Comic/edit_reader',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						openid: this.openid,
						nickname: nickName,
						head: avatarUrl
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
			},
			getComicInfo() {
				uni.request({
					url: this.$requestUrl+'Comic/get_comic_info',
					method: 'GET',
					data: {
						comic_id: this.comicId,
						openid: this.openid
					},
					success: res => {
						this.comic = res.data.data;
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
            // 获取评论
            getCommentInfo() {
                uni.request({
                	url: this.$requestUrl+'Comic/get_comment',
                	method: 'GET',
                	data: {
                        comic_id: this.comicId
                    },
                	success: res => {
                        this.commentData = res.data.data;
                    }
                });
            },
			// 回复
			commentChange(e) {
				this.comment = e.detail.value
			},
			reply(e) {
				this.isReplyTemplate = true
				this.replyParent = e
				this.replyWho = '回复：'+e.nickname
				console.log(e);
			},
			cancleReply() {
				this.isReplyTemplate = false
			},
			confirmReply() {
				if (this.comment.length < 1) {
					uni.showToast({
						title: '请输入评论内容',
				        icon: 'none',
						mask: false,
						duration: 1500
					});
				    return
				}
				
				uni.showLoading({
					title: '',
					mask: false
				});
				
				let pid;
				let level = this.replyParent.level;
				if (level == 1) {
					pid = this.replyParent.id
				} else {
					pid = this.replyParent.pid
				}
				
				uni.request({
					url: this.$requestUrl+'Comic/reply',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
				        comic_id: this.comicId,
				        openid: this.openid,
				        comment_content: this.comment,
						pid: pid,
						reply_comment_id: this.replyParent.id,
						reply_openid: this.replyParent.openid
				    },
					success: res => {
				        if (res.data.status == 1) {
				        	uni.showToast({
				        		title: '评论成功',
				        		mask: false,
				        		duration: 1500
				        	});
				            this.isReplyTemplate = false
				            this.getCommentInfo()
				        }
				    },
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			showDetail() {
				this.isDetail = true;
				this.isChapter = false;
			},
			showChapter() {
				this.isDetail = false;
				this.isChapter = true;
				if (!this.isChapterLoad) {
					uni.showLoading();
					uni.request({
						url: this.$requestUrl+'Comic/get_comic_chapter',
						method: 'GET',
						data: {
							comic_id: this.comic.comic_id
						},
						success: res => {
							this.isChapterLoad = true;
							this.chapterData = res.data.data;
						},
						fail: () => {},
						complete: () => {
							uni.hideLoading();
						}
					});
				}
			},
			reading() {
				// 直接阅读
				uni.request({
					url: this.$requestUrl+'Comic/get_reading_chapter',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id,
						openid: this.openid
					},
					success: res => {
						let detail = {
							comic_id: this.comic.comic_id,
							title: this.comic.title,
							cover: this.comic.cover,
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
			readingChoose(e) {
				// 选章阅读
				let detail = {
					comic_id: this.comic.comic_id,
					title: this.comic.title,
					cover: this.comic.cover,
					chapter: e.catalog, // 选择章节
				}
				uni.navigateTo({
					url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
				})
			},
			like() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/like',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						comic_id: this.comic.comic_id,
						openid: this.openid,
						channel: 2
					},
					success: res => {
						if (res.data.status == 1) {
							this.comic.is_like = 1;
							this.comic.heat = parseInt(this.comic.heat) + 1;
							uni.showToast({
								icon: 'none',
								title: '点赞成功'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '点赞失败'
							});
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			cancelLike() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/cancel_like',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id,
						openid: this.openid,
					},
					success: res => {
						if (res.data.status == 1) {
							this.comic.is_like = 0;
							this.comic.heat = parseInt(this.comic.heat) - 1;
							uni.showToast({
								icon: 'none',
								title: '取消点赞'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '取消点赞失败'
							});
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			collect() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/collect',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						comic_id: this.comic.comic_id,
						openid: this.openid,
						channel: 2
					},
					success: res => {
						if (res.data.status == 1) {
							this.comic.is_collect = 1;
							this.comic.collection = parseInt(this.comic.collection) + 1;
							uni.showToast({
								icon: 'none',
								title: '收藏成功'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '收藏失败'
							});
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			cancelCollect() {
				uni.showLoading({
					title: '',
					mask: false
				});
				uni.request({
					url: this.$requestUrl+'Reader/cancel_collect',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id,
						openid: this.openid,
					},
					success: res => {
						if (res.data.status == 1) {
							this.comic.is_collect = 0;
							this.comic.collection = parseInt(this.comic.collection) - 1;
							uni.showToast({
								icon: 'none',
								title: '取消收藏'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '取消收藏失败'
							});
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
            goComment() {
                let detail = {
                    comic_id: this.comic.comic_id,
                    title: this.comic.title
                }
                uni.navigateTo({
                	url: "../comment/comment?detailData=" + JSON.stringify(detail)
                })
            },
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
				})
			}
		},
		onShareAppMessage(res) {
			let title = this.comic.title;
			let imageUrl = this.comic.cover;

			let detail = {
				openid: this.openid,
				comic_id: this.comic.comic_id,
				title: title
			}
            
            if (this.isProxy) {
            	detail.proxy_openid = this.openid;
            }
            
			return {
				title: title,
				imageUrl: imageUrl,
				path: '/pages/comic-info/comic-info?detailData=' + JSON.stringify(detail),
			}
		}
	}
</script>

<style>
	@import "../../common/comment.css";
	page {
		background: #FFF;
	}

	.banner {
		height: 450upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner:after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
	}

	.banner-img {
		width: 100%;
	}

	.banner-title,
	.banner-info {
		position: absolute;
		left: 30upx;
		z-index: 9;
		color: #FFF;
	}

	.banner-title {
		bottom: 80upx;
		width: 90%;
		font-size: 42upx;
		font-weight: bold;
		line-height: 42upx;
	}

	.banner-info {
		width: calc(100% - 60upx);
		bottom: 20upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.banner-info .banner-type {
		display: flex;
	}

	.type-item {
		height: 32upx;
		line-height: 32upx;
		border: 1px solid #FFF;
		border-radius: 2px;
		padding: 0 3px;
		margin-right: 5px;
	}


	.func {
		height: 120upx;
		display: flex;
	}

	.func-item {
		font-size: 32upx;
		width: 50%;
		padding: 0 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.func-item .label,
	.func-item .btn {
		display: flex;
		align-items: center;
	}

	.func-item .label {
		width: 50%;
		height: 40upx;
		display: flex;
		justify-content: center;
	}

	.func-item .label+.label {
		border-left: 1px solid #e1e1e1;
	}

	.func-item .btn {
		width: 100%;
		height: 76upx;
		color: #FFF;
		background-color: #E27C6B;
		border-radius: 76upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.func-item .icon {
		width: 36upx;
		height: 36upx;
		margin-right: 8px;
	}

	.tabbar {
		border-bottom: 1px solid #e1e1e1;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.tabbar-item {
		width: 220upx;
		height: 100upx;
		font-size: 32upx;
		line-height: 100upx;
		color: #919191;
		text-align: center;
	}

	.tabbar-item.on {
		color: #E27C6B;
		border-bottom: 2px solid #E27C6B;
	}

	.body {
		padding: 20px 15px;
		background-color: #FFF;
	}

	.detail {
		background-color: #F6F6F6;
	}

	.detail .label {
		font-size: 32upx;
		color: #919191;
		margin-bottom: 10px;
	}

	.info {
		font-size: 28upx;
		line-height: 40upx;
		margin-bottom: 20px;
	}

	.status {
		display: flex;
	}

	.status-item {
		flex: 1;
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.status-item+.status-item:before {
		content: '';
		display: block;
		width: 1px;
		height: 50upx;
		background-color: #e1e1e1;
		position: absolute;
		left: 0;
	}

	.status-item .title {
		color: #E27C6B;
	}

	.comment {
		padding-top: 15px;
	}
	
	.grace-padding {
		padding: 2%;
		width: 96%;
	}

	.uni-media-list {
		padding: 3px 0;
		display: flex;
	}

	.uni-media-list-logo {
		width: 200upx;
		height: 130upx;
	}

	.uni-media-list-body {
		height: 120upx;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.uni-media-list-text-top {
		font-size: 32upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.uni-media-list-text-top image {
		width: 50upx;
		height: 50upx;
	}

	.uni-media-list-text-bottom {
		font-size: 26upx;
		display: flex;
	}

	.popular {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}

	.popular image {
		width: 30upx;
		height: 20upx;
		margin-right: 5px;
	}

	.uni-list:before,
	.uni-list:after,
	.uni-list-cell:after {
		height: 0upx;
	}

	.go-top {
		position: fixed;
		right: 50upx;
		bottom: 50upx;
	}

	.go-top image {
		width: 60upx;
		height: 60upx;
	}

	.login-btn {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: none;
	}

	.login-btn:after {
		border: 0;
	}
</style>
