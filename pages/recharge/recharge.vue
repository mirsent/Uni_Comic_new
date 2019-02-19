<template>
	<view>
		<view class="list">
			<view class="item" 
                v-for="(activity, index) in activityData" :key="index"
                :class="{on: index == onIndex}"
                @tap="choose(index)">
				<view class="title">
					{{activity.money}}元
				</view>
                <view class="brief">
                	{{activity.activity_title}}
                </view>
			</view>
            <!-- #ifdef MP-WEIXIN -->
                <button class="btn" @tap="weixinPay">立即支付{{onMoney}}元</button>
            <!-- #endif -->
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
                openid: '',
                comicId: '',
                chapter: '',
				activityData: [],
                onIndex: 0,
                onId: '',
                onMoney: ''
			};
		},
        onLoad(e) {
            uni.showLoading({
            	title: '',
            	mask: false
            });
            
            let readerInfo = service.getUsers();
            this.openid = readerInfo.openid;
            
//             let comicInfo = JSON.parse(e.detailData);
//             this.comicId = comicInfo.comic_id;
//             this.chapter = comicInfo.chapter;
            
        	this.get_activity();
        },
        methods: {
            get_activity() {
                uni.request({
                	url: this.$requestUrl+'Order/get_recharge_activity',
                	method: 'GET',
                	success: res => {
                        let activity = res.data.data;
                        this.activityData = activity;
                        this.onId = activity[0]['id'];
                        this.onMoney = activity[0]['money'];
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            },
            choose(e) {
                this.onIndex = e;
                this.onId = this.activityData[e]['id'];
                this.onMoney = this.activityData[e]['money'];
            },
            weixinPay() {
				return 
                uni.showLoading({
                	title: '',
                	mask: false
                });
                let activityId = this.onId;
                uni.request({
                	url: this.$requestUrl+'Order/create_recharge_order',
                	method: 'POST',
                    header: {
                    	'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                        openid: this.openid,
                        comic_id: this.comicId,
                        chapter: this.chapter,
                        activity_id: activityId,
                        channel: 2
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.requestPayment({
                                provider: 'wxpay',
                                timeStamp: String(Date.now()),
                                nonceStr: 'A1B2C3D4E5',
                                package: 'prepay_id=wx20180101abcdefg',
                                signType: 'MD5',
                                paySign: '',
                                success: function (res) {
                                    console.log('success:' + JSON.stringify(res));
                                },
                                fail: function (err) {
                                    console.log('fail:' + JSON.stringify(err));
                                }
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            }
        }
	}
</script>

<style>
    .list{
        padding: 20px 30px;
    }
    .item{
        height: 120upx;
        margin-bottom: 20px;
        border: 2px solid #CCC;
        border-radius: 5px;
        display: flex;
        align-items: center;
    }
    .item.on{
        background-color: #FEFEF2;
        border: 2px solid #D69742;
    }
    .title{
        font-size: 42upx;
        width: 140upx;
        height: 50upx;
        line-height: 50upx;
        text-align: center;
        border-right: 1px solid #CCC;
    }
    .item.on .title{
        color: #E4AA52;
    }
    .brief{
        font-size: 32upx;
        padding: 0 20px;
    }
    
    .btn{
    	font-size: 38upx;
    	height: 100upx;
    	line-height: 100upx;
    	border-radius: 100upx;
    	background: linear-gradient(to right, #FFE153, #FFC11F);
    }
    .btn:before,
    .btn:after{
    	border: 0;
    }
</style>
