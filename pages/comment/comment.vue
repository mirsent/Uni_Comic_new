<template>
	<view class="content">
		<textarea placeholder="请输入评论..." @input="commentChange" />
        <view class="btn-group">
        	<button @tap="cancel">取消</button>
            <button class="btn-confirm" @tap="confirm">提交</button>
        </view>
	</view>
</template>

<script>
    import service from '../../service.js';
	export default {
		data() {
			return {
                comicId: '',
                openid: '',
				comment: ''
			};
		},
        onLoad(e) {
        	let readerInfo = service.getUsers();
        	this.openid = readerInfo.openid;
            
            let info = JSON.parse(e.detailData);
            this.comicId = info.comic_id;
            uni.setNavigationBarTitle({
            	title: info.title
            })
        },
        methods: {
            commentChange(e) {
                let content = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
                this.comment = content;
            },
            cancel() {
                uni.navigateBack({
                	delta: 1
                });
            },
            confirm() {
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
                	url: this.$requestUrl+'Comic/comment',
                	method: 'POST',
                	header: {
                		'content-type': 'application/x-www-form-urlencoded'
                	},
                	data: {
                        comic_id: this.comicId,
                        openid: this.openid,
                        comment_content: this.comment
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.showToast({
                        		title: '评论成功',
                        		mask: false,
                        		duration: 1500
                        	});
                            setTimeout(()=>{
                                uni.navigateBack({
                                	delta: 1
                                });
                            }, 1500)
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            }
        }
	}
</script>

<style>
    .content{
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
    textarea{
        width: 100%;
    }
	button{
		font-size: 32upx;
	}
    .btn-confirm{
        color: #FFF;
        background-color: #E27C6B;
		margin-top: 5px;
    }
</style>
