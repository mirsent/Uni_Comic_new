<template>
	<view>
		<view class="tab">
			<view class="tab-cell" :class="{on: tabIndex == 1}" @tap="showReply">
				回复
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 2}" @tap="showNotice">
				通知
			</view>
			<view class="tab-cell" :class="{on: tabIndex == 3}" @tap="showActivity">
				活动
			</view>
		</view>
		
		<!-- 回复 -->
		<view class="item reply" v-show="tabIndex == 1">
			<view class="grace-comment">
				<view class="comment-item">
					<view class="grace-comment-list" v-for="(r,index) in replyData" :key="index">
						<view class="grace-comment-face">
							<image :src="r.head" mode="widthFix"></image>
						</view>
						<view class="grace-comment-body">
							<view class="grace-comment-name">
								{{r.nickname}}
							</view>
							<view class="grace-comment-date">
								{{r.comment_time}}
							</view>
							<view class="grace-comment-content">{{r.comment_content}}</view>
							<view class="grace-comment-footer">
								<text @tap="showReplyTemplate(r.comic_id)">展开</text>
								<text @tap="reply(r)">回复</text>
							</view>
							<view class="grace-comment-brief">
								漫画：{{r.comic_title}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 回复模板 -->
		<view class="comment-template" v-if="isCommentTemplate" @tap="closeCommentTemplate">
			<view class="comment-body" @tap.stop="">
				<input type="text" value="" :placeholder="replyWho" class="comment-input" @input="commentChange" />
				<text class="comment-btn" @tap="confirmReply">发表</text>
			</view>
		</view>
		
		<view class="reply-template" v-if="isReplyTemplate" @tap="closeReplyTemplate">
			<view class="reply-box" @tap.stop="">
				<view class="reply-body">
					<scroll-view scroll-y :style="{height: scrollHeight+'px'}">
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
											<text></text>
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
											<view class="grace-comment-content">{{c.comment_content}}</view>
											<view class="grace-comment-footer">
												<text></text>
												<text @tap="reply(c)">回复</text>
											</view>
										</view>
									</view>
								</view>
								
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="reply-footer" @tap="closeReplyTemplate">
					收起
				</view>
			</view>
		</view>
		
		<!-- 通知 -->
		<view class="item notice" v-show="tabIndex == 2">
			<view class="notice-list" v-for="(notice,index) in noticeData" :key="notice">
				<view class="notice-body">
					<view class="notice-title">
						系统消息
					</view>
					<view class="notice-time">
						{{notice.notice_time}}
					</view>
				</view>
				<view class="notice-footer">
					{{notice.content}}
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
				scrollHeight: '',
				
				// 回复
				isCommentTemplate: false,
				comment: '',
				replyParent: [],
				replyWho: '',
				
				isReplyTemplate: false,
				replyComicId: '',
				
				readerInfo: [],
				replyData: [],
				commentData: [],
				noticeData: []
			};
		},
		onLoad() {
			let readerInfo = service.getUsers();
			this.readerInfo = readerInfo
			
			this.getReply()
			this.getNotice()
			
			uni.getSystemInfo({
				success: (res) => {
					let windowHeight = res.windowHeight;
					this.scrollHeight = windowHeight - 150;
				}
			})
		},
		methods: {
			getReply() {
				uni.request({
					url: this.$requestUrl+'Reader/get_reply',
					method: 'GET',
					data: {
						reply_openid: this.readerInfo.openid
					},
					success: res => {
						this.replyData = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getNotice() {
				uni.request({
					url: this.$requestUrl+'Reader/get_notice',
					method: 'GET',
					data: {
						reader_id: this.readerInfo.id
					},
					success: res => {
						this.noticeData = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 获取评论
			getCommentInfo() {
			    uni.request({
			    	url: this.$requestUrl+'Comic/get_comment',
			    	method: 'GET',
			    	data: {
			            comic_id: this.replyComicId
			        },
			    	success: res => {
			            this.commentData = res.data.data;
			        }
			    });
			},
			// 展开
			showReplyTemplate(e) {
				this.isReplyTemplate = true
				this.replyComicId = e
				this.getCommentInfo()
			},
			closeReplyTemplate() {
				this.isReplyTemplate = false
			},
			// 回复
			commentChange(e) {
				this.comment = e.detail.value
			},
			reply(e) {
				this.isCommentTemplate = true
				this.replyParent = e
				this.replyWho = '回复：'+e.nickname
				console.log(e);
			},
			closeCommentTemplate() {
				this.isCommentTemplate = false
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
				            setTimeout(()=>{
				                this.isCommentTemplate = false
								uni.hideLoading()
				            }, 1500)
				        }
				    },
					fail: () => {},
					complete: () => {}
				});
			},
			showReply() {
				this.tabIndex = 1;
			},
			showNotice() {
				this.tabIndex = 2;
			},
			showActivity() {
				this.tabIndex = 3;
			}
		}
	}
</script>

<style>
	@import "../../common/comment.css";
	.notice-list {
		padding: 10px;
		border-radius: 5px;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, .3);
	}
	.notice-body {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
	}
	.notice-title {
		font-size: 32upx;
	}
	.notice-time {
		font-size: 20upx;
		color: #666666;
	}
	.notice-footer {
		font-size: 28upx;
	}
	
	/* 回复 */
	.item {
		padding: 10px;
	}
	.comment-item{
		padding: 10px;
	}
	.grace-comment-date {
		margin-bottom: 5px;
	}
	.grace-comment-content {
		margin-bottom: 8px;
	}
	.grace-comment-footer{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.grace-comment-brief{
		font-size: 28upx;
		background-color: #FAFAFA;
		padding: 10px;
	}
	
	
	.reply-template {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.7);
		display: flex;
		align-items: flex-end;
	}
	.reply-box {
		width: 100%;
		background-color: #FFF;
	}
	.reply-footer {
		font-size: 28upx;
		text-align: center;
		line-height: 3;
		border-top: 1px solid #f1f1f1;
	}
</style>
