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

			<view class="card card-3">
				<view class="cover">
					<image src="../../static/img/new_bg.png" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title text-2-ellipsis">
						名侦探柯南
					</view>
					<view class="brief text-2-ellipsis">
						高中生侦探工藤新一，被称为“日本警察的救世主”，“平成年代的福尔摩斯”。
					</view>
				</view>
			</view>

			<!-- 推荐 -->
			<view class="recommend">
				<view class="card cover">
					<image src="../../static/img/recommend.jpg" mode="widthFix"></image>
				</view>
				<view class="body">
					<view class="head">
						<image src="../../static/img/head.jpg"></image>
					</view>
					<view class="content">
						<view class="top">
							<view class="title">
								漆黑的追踪者
							</view>
							<view class="view">
								<image src="../../static/img/fire.png"></image>
								<text>982</text>
							</view>
						</view>
						<view class="brief text-ellipsis">
							漆黑的追踪者是《名侦探柯南》第13部剧场版，讲述东京发生的6起连环杀人案件，警视厅高度重视，并慢慢揭开了凶手的阴谋，当爱尔兰的出场才是整部剧的高潮。
						</view>
					</view>
				</view>
			</view>

			<view class="recommend">
				<view class="card cover">
					<image src="../../static/img/recommend2.jpg" mode="widthFix"></image>
				</view>
				<view class="body">
					<view class="head">
						<image src="../../static/img/head.jpg"></image>
					</view>
					<view class="content">
						<view class="top">
							<view class="title">
								第11个前锋
							</view>
							<view class="view">
								<image src="../../static/img/fire.png"></image>
								<text>1023</text>
							</view>
						</view>
						<view class="brief text-ellipsis">
							第11个前锋是《名侦探柯南》第16部，讲述了毛利小五郎接收到一个神秘的爆炸预告电话，柯南为了阻止爆炸事件的发生，因此对谜题发出挑战并揭开谜底。
						</view>
					</view>
				</view>
			</view>

			<view class="card subject">
				<view class="content">
					<view class="top">
						<view class="top-box">
							<image src="../../static/img/timg1.jpg"></image>
							<image src="../../static/img/timg2.jpg"></image>
							<image src="../../static/img/timg3.jpg"></image>
							<image src="../../static/img/timg4.jpg"></image>
							<image src="../../static/img/timg1.jpg"></image>
							<image src="../../static/img/timg2.jpg"></image>
							<image src="../../static/img/timg3.jpg"></image>
							<image src="../../static/img/timg4.jpg"></image>
						</view>
					</view>
					<view class="bottom">
						<view class="top-box" style="margin-left: -100upx;">
							<image src="../../static/img/timg5.jpg"></image>
							<image src="../../static/img/timg6.jpg"></image>
							<image src="../../static/img/timg7.jpg"></image>
							<image src="../../static/img/timg.jpg"></image>
							<image src="../../static/img/timg5.jpg"></image>
							<image src="../../static/img/timg6.jpg"></image>
							<image src="../../static/img/timg7.jpg"></image>
							<image src="../../static/img/timg.jpg"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="subject-title">
				专题推荐：70/80回忆 小人书
			</view>

			<view class="item update">
				<view class="item-title">
					最近更新
				</view>
				<view class="item-list">
					<view class="cell">
						<view class="cell-brief">
							01.23
						</view>
						<view class="cell-img">
							<image src="../../static/img/timg.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
					<view class="cell">
						<view class="cell-brief">
							01.23
						</view>
						<view class="cell-img">
							<image src="../../static/img/timg1.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
					<view class="cell">
						<view class="cell-brief">
							01.23
						</view>
						<view class="cell-img">
							<image src="../../static/img/timg2.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
					<view class="cell">
						<view class="cell-brief">
							01.25
						</view>
						<view class="cell-img">
							<image src="../../static/img/timg3.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门
						</view>
					</view>
					<view class="cell">
						<view class="cell-brief">
							01.26
						</view>
						<view class="cell-img">
							<image src="../../static/img/timg4.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
				</view>
			</view>

			<view class="item like">
				<view class="item-title">
					猜你喜欢
				</view>
				<view class="item-list">
					<view class="cell">
						<view class="cell-img">
							<image src="../../static/img/timg7.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							大名府
						</view>
					</view>
					<view class="cell">
						<view class="cell-img">
							<image src="../../static/img/timg5.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
					<view class="cell">
						<view class="cell-img">
							<image src="../../static/img/timg6.jpg"></image>
						</view>
						<view class="cell-title text-ellipsis">
							醉打蒋门神
						</view>
					</view>
				</view>
				<view class="btn-group">
					<button>查看更多</button>
					<button>
						<uni-icon size="14" type="loop" color="#7F7F7F"></uni-icon>
						换一换
					</button>
				</view>
			</view>

		</view>

		<!-- 画册 -->
		<view class="wrap collect">
			<view class="left">
				<view class="item">
					<image class="item-img" src="../../static/img/new_bg.png" mode="widthFix"></image>
					<view class="item-info">
						<view class="item-title">
							柯南剧场版零的执行人
						</view>
						<view class="item-footer">
							<view class="info-box">
								<image class="info-head" src="../../static/img/head.jpg"></image>
								<text class="info-name">mirse</text>
							</view>
							<view class="like-box">
								<image class="like-icon" src="../../static/img/like.png"></image>
								<text>996</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="item">
					<image class="item-img" src="../../static/img/recommend.jpg" mode="widthFix"></image>
					<view class="item-info">
						<view class="item-title">
							柯南剧场版零的执行人
						</view>
						<view class="item-footer">
							<view class="info-box">
								<image class="info-head" src="../../static/img/head.jpg"></image>
								<text class="info-name">mirse</text>
							</view>
							<view class="like-box">
								<image class="like-icon" src="../../static/img/like.png"></image>
								<text>996</text>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<image class="item-img" src="../../static/img/recommend2.jpg" mode="widthFix"></image>
					<view class="item-info">
						<view class="item-title">
							柯南剧场版零的执行人
						</view>
						<view class="item-footer">
							<view class="info-box">
								<image class="info-head" src="../../static/img/head.jpg"></image>
								<text class="info-name">mirse</text>
							</view>
							<view class="like-box">
								<image class="like-icon" src="../../static/img/like.png"></image>
								<text>996</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				tabIndex: 1,
			}
		},
		components: {
			uniIcon
		},
		onLoad() {

		},
		methods: {
			showFind() {
				this.tabIndex = 1;
			},
			showCollect() {
				this.tabIndex = 2;
			}
		}
	}
</script>

<style>
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
	}

	.collect .item-info {
		padding: 8px;
		background-color: #F7DEC9;
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
	
	.collect .info-box .info-head{
		border-radius: 50%;
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
		width: 100%;
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
		position: absolute;
		top: 250px;
	}

	/* 推荐 */
	.recommend {
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #EAEAEA;
	}

	.recommend .cover {
		height: 140px;
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

	.find .item + .item {
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
	}

	.update .cell-img image {
		width: 100upx;
		height: 100upx;
	}

	.update .cell-brief {
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
</style>
