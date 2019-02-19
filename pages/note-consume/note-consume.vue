<template>
	<view>
		<view class="timeline">
			<view class="timeline-item" 
                :class="[{'timeline-first-item': index == 0}, {'timeline-last-item': index == noteData.length-1}]"
                v-for="(note, index) in noteData" :key="index">
				<view class="timeline-item-divider"></view>
				<view class="timeline-item-content bottom-border">
					<view class="content">
						{{note.content}}
					</view>
					<view class="datetime">
                        <text>{{note.create_at}}</text>
						<text class="cost">-{{note.points}}金币</text> 
					</view>
				</view>
			</view>
            
            <text class="content" v-if="noteData.length == 0">暂无记录...</text>
		</view>
	</view>
</template>

<script>
    import service from '../../service.js';
	export default {
		data() {
			return {
                openid: '',
                noteData: []
			};
		},
        onLoad(e) {
        	let readerInfo = service.getUsers();
        	this.openid = readerInfo.openid;
            
            this.getNote();
        },
        methods: {
            getNote() {
                uni.request({
                	url: this.$requestUrl+'Reader/get_consume_note',
                	method: 'GET',
                	data: {
                        openid: this.openid
                    },
                	success: res => {
                        this.noteData = res.data.data;
                    },
                	fail: () => {},
                	complete: () => {}
                });
            }
        }
	}
</script>

<style>
    @import "../../common/note.css";
</style>
