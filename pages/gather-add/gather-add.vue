<template>
	<view class="wrap">
		<view class="form">
			<view class="input-group">
				<view class="label">
					标题
				</view>
				<view class="input">
					<input type="text" value="" @input="titleChange" />
				</view>
			</view>
		
			<view class="uploader">
				<block v-for="(image,index) in imageList" :key="index">
					<view class="uploader-file">
						<image class="uploader-img" :src="image" mode="widthFix"></image>
						<view class="remove" @tap="removeImage(index)">
							<uni-icon size="30" type="trash" color="#fff"></uni-icon>
						</view>
					</view>
				</block>
				<view class="uploader-input-box">
					<view class="uploader-input" @tap="chooseImage">
						<uni-icon size="50" type="plusempty" color="#ccc"></uni-icon>
					</view>
				</view>
			</view>
		
		</view>
		
		<view class="btn">
			<button type="primary" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js'
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				readerId: '',
				title: '',
				imgs: [],
				imageList: []
			};
		},
		components: {
			uniIcon
		},
		onLoad() {
			this.readerId = service.getUsers()['id'];
		},
		methods: {
			chooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function (res) {
						console.log(res);
						_this.imageList = _this.imageList.concat(res.tempFilePaths);
					}
				});
			},
			removeImage(e) {
				this.imageList.splice(e, 1);
			},
			titleChange(e) {
				this.title = e.detail.value;
			},
			uploadImg(imgPath, count) {
				let _this = this;
				uni.uploadFile({
					url: this.$requestUrl+'Comic/upload_img',
					filePath: imgPath,
					name: 'file',
					formData: {
						
					},
					success: (uploadFileRes) => {
						_this.imgs = _this.imgs.concat(uploadFileRes.data);
						count++;
						if (count < _this.imageList.length) {
							_this.uploadImg(_this.imageList[count], count);
						} else {
							_this.addGather();
						}
					}
				});
			},
			addGather() {
				uni.request({
					url: this.$requestUrl+'Reader/add_gather',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						publisher_id: this.readerId,
						gather_title: this.title,
						url: this.imgs
					},
					success: res => {
						uni.navigateBack({
							delta: 1
						});
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			save() {
				uni.showLoading({
					title: '',
					mask: false
				});
				if (!this.title) {
					uni.showToast({
						title: '输入标题',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if (!this.imgs) {
					uni.showToast({
						title: '选择图片',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				
				this.uploadImg(this.imageList[0], 0);
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.wrap{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.form {
		padding: 10px;
	}

	.input-group {
		font-size: 36upx;
		padding: 10px 20px;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color: #F7DEC9;
		display: flex;
		align-items: center;
	}
	.input-textarea{
		align-items: flex-start;
	}

	.label {
		color: #D1513B;
		margin-right: 8px;
	}

	.input {
		flex: 1;
		color: #9496a2;
	}
	.input textarea{
		width: 100%;
		height: 60px;
	}
	
	.btn{
		margin-bottom: 30px;
	}
	.btn button{
		width: 460upx;
		background-color: #D1513B;
		border-radius: 50px;
	}
	
	.uploader{
		display: flex;
		flex-wrap: wrap;
	}
	.uploader-file{
		width: 100%;
		position: relative;
	}
	.remove{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,.5);
		margin-bottom: 5px;
	}
	.uploader-file image{
		width: 100%;
	}
	.uploader-input-box{
		width: 100%;
		height: 400upx;
		border: 1px solid #e9eaec;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
