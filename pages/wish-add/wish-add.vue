<template>
	<view class="content">
		<input type="text" placeholder="请输入需求..." value="" @input="titleChange" />
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
				title: '',
				readerInfo: []
			};
		},
        onLoad(e) {
        	let readerInfo = service.getUsers();
        	this.readerInfo = readerInfo;
        },
        methods: {
            titleChange(e) {
                this.title = e.detail.value
            },
            cancel() {
                uni.navigateBack({
                	delta: 1
                });
            },
            confirm() {
                if (this.title.length < 1) {
                	uni.showToast({
                		title: '请输入需求',
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
                	url: this.$requestUrl+'Reader/wish',
                	method: 'POST',
                	header: {
                		'content-type': 'application/x-www-form-urlencoded'
                	},
                	data: {
                        reader_id: this.readerInfo.id,
                        wish_title: this.title
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.showToast({
                        		title: '发布需求成功',
                        		mask: false,
                        		duration: 1500
                        	});
                            setTimeout(()=>{
                                uni.navigateBack({
                                	delta: 1
                                });
                            }, 1000)
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
    input{
        width: 100%;
		margin-bottom: 10px;
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
