<template>
	<view class="wrap">
		<view class="info">
			<view class="info-left">
				<view class="title">
					{{gatherInfo.gather_title}}
				</view>
				<view class="brief">
					<text>{{gatherInfo.nickname}}</text>
					<text>{{gatherInfo.publish_time}}</text>
				</view>
			</view>
			<view class="info-right">
				<image class="like-icon" src="../../static/img/collect_on.png"
					v-if="gatherInfo.is_like" 
					@tap="cancelLikeGather(gatherInfo.id)">
				</image>
				<image class="like-icon" src="../../static/img/collect_red.png"
					 v-else
					 @tap="likeGather(gatherInfo.id)">
				</image>
				<text class="like-number">{{gatherInfo.likes}}</text>
			</view>
		</view>
		
		<view class="imgs">
			<image :src="url" mode="widthFix" v-for="(url,index) in gatherInfo.url" :key="index"></image>
		</view>
		
		<!-- 评论 -->
		<view class="comment">
			<view class="comment-header">
				<view class="title">
					评论({{commentData.count}})
				</view>
				<view class="write" @tap="commentGather">
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
					
			        <view class="grace-comment-list" v-if="commentData.count == 0">
			            <view class="grace-comment-content">暂无评论...</view>
			        </view>
				</view>
			</view>
		</view>
		
		<!-- 评论模板 -->
		<view class="comment-template" v-if="isCommentTemplate" @tap="cancleComment">
			<view class="comment-body" @tap.stop="">
				<input type="text" value="" :placeholder="commentWho" class="comment-input" @input="commentChange" />
				<text class="comment-btn" @tap="confirmComment">发表</text>
			</view>
		</view>
		<!-- 回复模板 -->
		<view class="comment-template" v-if="isReplyTemplate" @tap="cancleReply">
			<view class="comment-body" @tap.stop="">
				<input type="text" value="" :placeholder="replyWho" class="comment-input" @input="commentChange" />
				<text class="comment-btn" @tap="confirmReply">发表</text>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				comment: '',
				// 回复
				isReplyTemplate: false,
				replyParent: [],
				replyWho: '',
				// 评论
				isCommentTemplate: false,
				commentWho: '',
				
				readerInfo: [],
				gatherInfo: [],
				commentData: []
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
						this.getComment()
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			getComment() {
				uni.request({
					url: this.$requestUrl+'Reader/get_gather_comment',
					method: 'GET',
					data: {
						gather_id: this.gatherInfo.id
					},
					success: res => {
						console.log(res.data.data);
						this.commentData = res.data.data
					},
					fail: () => {},
					complete: () => {}
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
			commentChange(e) {
				this.comment = e.detail.value
			},
			// 评论
			commentGather() {
				this.isCommentTemplate = true
				this.commentWho = '评论：'+this.gatherInfo.gather_title
			},
			cancleComment() {
				this.isCommentTemplate = false
			},
			confirmComment() {
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
				uni.request({
					url: this.$requestUrl+'Reader/comment',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
				        gather_id: this.gatherInfo.id,
				        openid: this.readerInfo.openid,
				        comment_content: this.comment
				    },
					success: res => {
				        if (res.data.status == 1) {
							this.isCommentTemplate = false
				        	uni.showToast({
				        		title: '评论成功',
				        		mask: false,
				        		duration: 1500
				        	});
				            this.getComment()
				        }
				    },
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			// 回复
			reply(e) {
				this.isReplyTemplate = true
				this.replyParent = e
				this.replyWho = '回复：'+e.nickname
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
					url: this.$requestUrl+'Reader/reply',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
				        gather_id: this.gatherInfo.id,
				        openid: this.readerInfo.openid,
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
				            this.getComment()
				        }
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
	@import "../../common/comment.css";
	
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		padding-bottom: 15px;
		border-bottom: 1px solid #F1F1F1;
	}
	.info-right {
		display: flex;
		align-items: center;
	}
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
	.like-number {
		font-size: 24upx;
		color: #666;
		margin-left: 5px;
		margin-bottom: 12px;
	}
	.brief {
		font-size: 24upx;
		color: #666;
	}
	.brief text + text {
		margin-left: 10px;
	}
	
	.imgs {
		margin-bottom: 10px;
	}
</style>
