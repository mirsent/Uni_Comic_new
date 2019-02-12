<template>
	<view class="wrap">
		<view class="nav">
			<view class="nav-cell" 
				:class="{placeholder: type.id == '-2', on: typeIndex == type.id}"
				@tap="getComic(type.id)"
				v-for="(type,index) in typeData" :key="index">
				{{type.comic_type_name}}
			</view>
		</view>
		
		<scroll-view scroll-y :style="{height: scrollHeight+'px'}">
			<view class="list">
				<view class="list-cell" v-for="(comic,index) in comicData" :key="index" @tap="goInfo(comic)">
					<view class="left">
						<image :src="comic.cover"></image>
					</view>
					<view class="right">
						<view class="title">
							{{comic.title}}
						</view>
						<view class="brief">
							人气值：{{comic.popularity}}
						</view>
						<view class="brief text-2-ellipsis">
							{{comic.brief}}
						</view>
					</view>
				</view>
				
				<view class="none" v-if="comicData.length == 0">
					暂无...
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: '',
				typeIndex: '-1',
				typeData: [],
				comicData: []
			};
		},
		onLoad() {
			this.getComicType()
			this.getComic('-1')
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					let windowHeight = res.windowHeight;
					
					let query = uni.createSelectorQuery();
					query.select(".nav").boundingClientRect();
					query.exec(data => {
						let tab = data[0];
						this.scrollHeight = windowHeight - tab.height - 150;
					});
				}
			})
		},
		methods: {
			getComicType() {
				uni.request({
					url: this.$requestUrl+'Comic/get_comic_type',
					method: 'GET',
					data: {},
					success: res => {
						this.typeData = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getComic(e) {
				this.typeIndex = e;
				uni.request({
					url: this.$requestUrl+'Comic/get_comic_list',
					method: 'GET',
					data: {
						type: e
					},
					success: res => {
						this.comicData = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goInfo(e) {
				let detail = {
					comic_id: e.id,
					title: e.title
				}
				uni.navigateTo({
					url: "../comic-info/comic-info?detailData=" + JSON.stringify(detail)
				})
			},
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
		min-width: 2em;
		margin-right: 50upx;
		margin-bottom: 8px;
		position: relative;
		text-align: center;
	}

	.nav-cell.on {
		color: #D1513B;
	}

	.nav-cell.on:after {
		content: '';
		display: inline-block;
		width: 26px;
		height: 2px;
		background-color: #D1513B;
		position: absolute;
		bottom: -4px;
		left: 4px;
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
	
	.list-cell .left image{
		height: 100%;
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
	
	.none{
		font-size: 28upx;
		color: #BBB;
	}
</style>
