<template>
	<view class="page" @tap="click">
        <view class="article-content">
        	<image :src="imgPrefix+img" mode="widthFix"
                 v-for="(img, index) in imgs" :key="index"
                 :class="{hide: needRelease && index > 1}">
            </image>
        </view>
		
        <view class="btn-group" v-show="isControl">
			<button type="default" v-if="chapter == 1" disabled>第一章</button>
			<button type="default" v-else @tap="prev">上一章</button>
        	<picker class="picker-item" mode="selector" :range="chapterData" :value="chapterIndex" range-key="catalog_name"
        	@change="chapterChange">
        		<button type="default">目录</button>
        	</picker>
			<button type="default" v-if="chapter == chapterLast" disabled>最末章</button>
        	<button type="default" v-else @tap="next">下一章</button>
        </view>
		
		<view class="action" v-show="isControl">
			<view class="action-item" @tap="goHome">
				<image src="../../static/img/home.png"></image>
				首页
			</view>
			<view class="action-item">
				<button type="primary" open-type="share">
					<image src="../../static/img/share.png"></image>
					分享
				</button>
			</view>
		</view>
        
        <view class="mask" v-if="showRelease" :catchtouchmove="false">
        	<view class="auth">
        		<view class="auth-body">
        			<view class="brief">解锁后继续阅读</view>
        			<view class="auth-box">
        				<view class="box-header">
        					① 金币解锁
        				</view>
        				<view class="title">需支付<text>{{needPay}}金币</text></view>
        				<view class="balanse" v-if="!hasBalanse">
        					余额不足，请充值
        				</view>
        				<button class="btn" v-if="hasBalanse" @tap="unlock">解锁</button>
        				<button class="btn" v-else @tap="recharge">充值并解锁</button>
        			</view>
        			<view class="auth-box">
        				<view class="box-header">
        					② 转发解锁
        				</view>
        				<button open-type="share" class="btn">转发{{needShare}}名好友</button>
        			</view>
        		</view>
                <view class="auth-footer">
                	账户余额：{{balance}}金币
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
                openid: '',
                imgPrefix: '',
                comicId: '',
                chapter: '',
                title: '',
                cover: '',
                balance: '',
                chapterIndex: '',
                chapterData: [],
                chapterLast: '',
                imgs: [],
                isControl: false,
                
                shareCover: '',
                
                needRelease: false, // 需要解锁
                showRelease: false, 
                canChoose: true, // 2条途径
                hasBalanse: true,
                chooseShare: false, // 选分享解锁
                needPay: '', // 需支付
                needShare: '', // 需转发数
			}
		},
		onLoad(e) {
			uni.showLoading();
            
			let readerInfo = service.getUsers();
			this.openid = readerInfo.openid;
			this.imgPrefix = this.$imgUrl; // 图片前缀

			let comicInfo = JSON.parse(e.detailData);
			this.comicId = comicInfo.comic_id;
            this.chapter = comicInfo.chapter;
            this.title = comicInfo.title;
            this.cover = comicInfo.cover;
			this.chapterIndex = comicInfo.chapter - 1; //picker选中项

			this.reading();
            this.checkAuth();
			this.getChapter(); // 获取目录
		},
        onShow() {
        	this.checkAuth();
            this.getReader();
            this.chooseShare = false;
        },
        onHide() {
        	if (this.chooseShare) {
        		this.noteShare();
        	}
        },
		onPageScroll() {
			this.isControl = false
		},
        onReachBottom(){
            if (this.needRelease) {
            	this.showRelease = true;
            }
			// 显示控制板
			this.isControl = true
        },
		methods: {
			click() {
				this.isControl = !this.isControl
			},
            reading() {
            	uni.request({
            		url: this.$requestUrl+'Comic/reading',
            		method: 'GET',
            		data: {
            			comic_id: this.comicId,
            			chapter: this.chapter,
            			openid: this.openid,
            			channel: 2
            		},
            		success: (res) => {
            			let comicInfo = res.data.data;
            			uni.setNavigationBarTitle({
            				title: this.title + ' ' + comicInfo.chapter_title
            			})
                        this.shareCover = comicInfo.share_cover;
            			this.imgs = comicInfo.imgs;
            		},
            		fail: () => {
            			console.log('呀，当前网络状况不好');
            		},
            		complete: () => {
            			uni.hideLoading();
            		}
            	})
            },
			// 验证权限
            checkAuth() {
            	uni.request({
            		url: this.$requestUrl+'Comic/check_auth',
            		method: 'GET',
            		data: {
            			comic_id: this.comicId,
            			chapter: this.chapter,
            			openid: this.openid
            		},
            		success: res => {
            			let info = res.data.data;
            			let status = res.data.status;
                        
                        console.log(res.data);
                        // -1：充值分享-2：充值-3：余额分享-4：余额
                        switch (status){
                        	case '-1':
                                this.needRelease = true;
                                this.hasBalanse = false;
                                this.needShare = info.need_share;
                                this.needPay = info.need_pay;
                        		break;
                            case '-2':
                                this.needRelease = true;
                                this.hasBalanse = false;
                                this.canChoose = false;
                                this.needPay = info.need_pay;
                                break;
                            case '-3':
                                this.needRelease = true;
                                this.hasBalanse = true;
                                this.needShare = info.need_share;
                                this.needPay = info.need_pay;
                                break;
                            case '-4':
                                this.needRelease = true;
                                this.hasBalanse = true;
                                this.canChoose = false;
                                this.needPay = info.need_pay;
                                break;
                        	default:
                                this.needRelease = false;
                                this.showRelease = false;
                        		break;
                        }
            		}
            	});
            },
            // 记录分享次数
            noteShare(){
            	uni.request({
            		url: this.$requestUrl+'Comic/share_help',
            		method: 'GET',
            		data: {
            			comic_id: this.comicId,
            			chapter: this.chapter,
            			openid: this.openid
            		},
            		success: res => {
            			console.log(res.data);
            		}
            	});
            },
            unlock(){
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Comic/unlock',
                	method: 'POST',
                	header: {
                		'content-type': 'application/x-www-form-urlencoded'
                	},
                	data: {
                        comic_id: this.comicId,
                        chapter: this.chapter,
                        openid: this.openid,
                        channel: 2
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	this.checkAuth();
                        } else {
                            uni.showToast({
                            	title: '解锁失败，稍后重试！',
                                icon: 'none',
                            	mask: false,
                            	duration: 1500
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            },
            recharge() {
                let detail = {
                    comic_id: this.comicId,
                    chapter: this.chapter
                }
                uni.navigateTo({
                	url: "../recharge/recharge?detailData=" + JSON.stringify(detail)
                });
            },
            getReader(){
                uni.request({
                	url: this.$requestUrl+'Comic/get_reader',
                	method: 'GET',
                	data: {
                        openid: this.openid
                    },
                	success: res => {
                        this.balance = res.data.data.balance;
                    }
                });
            },
			getChapter() {
				uni.request({
					url: this.$requestUrl+'Comic/get_comic_chapter',
					method: 'GET',
					data: {
						comic_id: this.comicId
					},
					success: res => {
                        let chapterInfo = res.data.data;
                        this.chapterLast = chapterInfo.length;
						this.chapterData = chapterInfo;
					}
				});
			},
            prev() {
                let prevChapter = parseInt(this.chapter) - 1;
                this.redirectTo(prevChapter);
            },
			next() {
                let nextChapter = parseInt(this.chapter) + 1;
                this.redirectTo(nextChapter);
			},
			chapterChange(e) {
				let chapterCur = parseInt(e.detail.value) + 1;
                this.redirectTo(chapterCur);
			},
            goHome() {
                uni.reLaunch({
                    url: '../index/index'
                });
            },
            redirectTo(chapter){
                let detail = {
                	comic_id: this.comicId,
                	title: this.title,
                	cover: this.cover,
                	chapter: chapter
                }
                uni.redirectTo({
                	url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
                });
            }
		},
        onShareAppMessage(res) {
        	let title = this.title;
        	let imageUrl = this.cover;
            
            let detail = {
            	share_openid: this.openid, // 记录上级
            	comic_id: this.comicId,
            	title: title
            }
            
        	if (res.from === 'button') {
        		// 限制阅读分享
        		detail.share_chapter = this.chapter;
                detail.help = 1;
                imageUrl = this.shareCover;
                
                this.chooseShare = true;
        	}
            console.log('分享参数：'+JSON.stringify(detail));
        	return {
        		title: title,
        		imageUrl: imageUrl,
        		path: '/pages/comic-info/comic-info?detailData=' + JSON.stringify(detail)
        	}
        },
	}
</script>

<style>
	.page {
		padding: 0 10upx;
	}
    
    .hide{
        display: none;
    }

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		margin-bottom: 20upx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.article-content image {
		width: 100%;
	}

	.btn-group {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 40px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFF;
		border-top: 1px solid #E6E6E6;
	}

	.btn-group button {
		font-size: 28upx;
		margin: 0;
		color: #9A9A9A;
		background-color: #FFF;
	}
	
	.btn-group button[disabled] {
		background-color: #FFF;
	}
	
	.btn-group button:after{
		border: 0;
	}
    
    .mask{
    	background-color: transparent;
    }
    .auth{
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	background-image: linear-gradient(to bottom, rgba(255,255,255,0.9), #FFF);
    }
    .auth .auth-body{
        padding: 10px 20px;
    }
    .auth .box-header{
    	font-size: 28upx;
    	color: #888;
    }
    .auth .brief{
    	font-size: 28upx;
    	color: #888;
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	margin-bottom: 10px;
    }
    .auth .brief:before,
    .auth .brief:after {
    	content: '';
    	display: block;
    	width: 200upx;
    	height: 1px;
    	background-color: rgba(136,136,136,.2);
    }
    .auth .title{
    	font-size: 42upx;
    	text-align: center;
    	margin-bottom: 5px;
    }
    .auth .title text{
    	color: #E64340;
    }
    .auth .balanse{
        color: #E64340;
        font-size: 28upx;
        text-align: center;
    }
    .auth .btn{
    	font-size: 32upx;
    	height: 90upx;
    	line-height: 90upx;
    	border-radius: 90upx;
    	background: linear-gradient(to right, #FFE153, #FFC11F);
    }
    .auth .btn:before,
    .auth .btn:after{
    	border: 0;
    }
    
    .auth .auth-footer{
        font-size: 28upx;
        color: #888;
        padding: 10px 20px;
        border-top: 1px solid rgba(136,136,136,.1);
    }
	
	/* 右侧 */
	.action {
		position: fixed;
		bottom: 100px;
		right: 15px;
	}
	.action-item {
		font-size: 20upx;
		color: #FFF;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(0,0,0,.4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 8px;
	}
	.action-item image {
		width: 18px;
		height: 18px;
	}
	.action-item button {
		margin: 0;
		padding: 0;
		line-height: 1;
		background-color: transparent;
		font-size: 20upx;
		display: flex;
		flex-direction: column;
	}
	.action-item button:after {
		border: 0;
	}
</style>
