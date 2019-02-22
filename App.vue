<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/common/uni.css";
	image {
		width: 100%;
	}

	.wrap {
		padding: 15px;
	}

	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text-2-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.tab {
		height: 100upx;
		display: flex;
	}
	
	.tab-cell {
		font-size: 32upx;
		color: #3C424B;
		border-bottom: 1px solid #C8C8C8;
		flex: 1;
		text-align: center;
		line-height: 100upx;
	}
	
	.tab-cell.on {
		color: #D1513B;
		border-bottom: 2px solid #D1513B;
	}
	
	.login-btn{
	    position: fixed;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: none;
	}
	.login-btn:after{
	    border: 0;
	}
	
	.btn-hover{
		position: relative;
		top: 1px;
		box-shadow:0px 0px 8px #999 inset;
	}
</style>
