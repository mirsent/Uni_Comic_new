<template>
	<view class="wrap">
		<view class="nav">
			<view class="nav-cell on">全部</view>
			<view class="nav-cell">微漫</view>
			<view class="nav-cell">总裁</view>
			<view class="nav-cell">穿越</view>
			<view class="nav-cell">校园</view>
			<view class="nav-cell">恐怖</view>
			<view class="nav-cell">古风</view>
			<view class="nav-cell">恋爱</view>
			<view class="nav-cell">奇幻</view>
			<view class="nav-cell">热血</view>
			<view class="nav-cell placeholder">占位</view>
			<view class="nav-cell placeholder">占位</view>
		</view>

		<view class="list">
			<view class="list-cell">
				<view class="left">
					<image src="../../static/img/new_bg.png" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="title">
						漆黑的追踪者
					</view>
					<view class="brief">
						人气值：1092
					</view>
					<view class="brief text-2-ellipsis">
						漆黑的追踪者是《名侦探柯南》第13部剧场版，讲述东京发生的6起连环杀人案件，警视厅高度重视，并慢慢揭开了凶手的阴谋，当爱尔兰的出场才是整部剧的高潮。
					</view>
				</view>
			</view>
			<view class="list-cell">
				<view class="left">
					<image src="../../static/img/new_bg.png" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="title">
						第11个前锋
					</view>
					<view class="brief">
						人气值：1092
					</view>
					<view class="brief text-2-ellipsis">
						第11个前锋是《名侦探柯南》第16部，讲述了毛利小五郎接收到一个神秘的爆炸预告电话，柯南为了阻止爆炸事件的发生，因此对谜题发出挑战并揭开谜底。
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.wrap {
		overflow-x: hidden;
	}

	.nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-right: -30px;
		margin-bottom: 20px;
		padding-bottom: 10px;
		border-bottom: 1px solid #F6F6F6;
	}

	.nav-cell {
		font-size: 32upx;
		margin-right: 50upx;
		margin-bottom: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav-cell.on {
		color: #D1513B;
	}

	.nav-cell.on:after {
		content: '';
		display: inline-block;
		width: 26px;
		height: 2px;
		position: relative;
		bottom: -3px;
		background-color: #D1513B;
	}

	.placeholder {
		visibility: hidden;
	}

	.list-cell {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #F6F6F6;
	}

	.list-cell .left {
		flex-shrink: 0;
		flex: 1;
		height: 280upx;
		margin-right: 12px;
		overflow: hidden;
	}

	.list-cell .right {
		width: 450upx;
	}

	.list-cell .right .title {
		font-size: 36upx;
		line-height: 2.5;
	}

	.list-cell .right .brief {
		width: 100%;
		flex-shrink: 0;
		font-size: 28upx;
		color: #BBB;
		line-height: 2;
	}
</style>
