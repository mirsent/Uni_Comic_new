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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1
			};
		}
	}
</script>

<style>

</style>
