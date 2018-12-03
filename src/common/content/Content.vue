<template>
    <div class="content" ref="content">
        <div class="wrap">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name:"app-content",
    props:{
        canLoadMore:Boolean,
        canLoadComingMore:Boolean
    },
    mounted(){
       this.contentScroll = new IScroll(this.$refs.content, {

        })
        this.contentScroll.on('beforeScrollStart', ()=>{
            this.contentScroll.refresh();
        })
        this.contentScroll.on('scrollEnd', ()=>{
            // console.log(this.canLoadComingMore);
            if((this.contentScroll.y <= this.contentScroll.maxScrollY) && this.canLoadMore){
                this.$emit('loadmore');
            }
            if((this.contentScroll.y <= this.contentScroll.maxScrollY)&&this.canLoadComingMore){
                this.$emit('load')      
            }
            if((this.contentScroll.y <= this.contentScroll.maxScrollY)){
                this.$emit('loadMoreCinema')      
            }
        })
    },
     methods: {
        // 刷新滚动视图的方法
        refresh(){
            // console.log('刷新');
            this.contentScroll.refresh();
        },
        reset(){
            this.contentScroll.scrollTo(0, 0);
            this.contentScroll.refresh();
        },
        scrollTo(y){
            this.contentScroll.scrollTo(0,y*(-1),200)
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
