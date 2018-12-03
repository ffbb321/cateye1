<template>
<app-content :style="{top: '88px', bottom: '0'}" @loadmore="getMoreData" :canLoadMore="canLoadMore">
<ul class="playing">
    <li class="playing-item" v-for="item in playingList" :key="item.id" @click="goMovieCon(item.id)" >
        <div class="item-img">
            <img :src="item.img"/>
        </div>
        <div class="item-content">
            <h3><span class="item-name">{{item.nm}}</span><img class="item-pic" src="../../assets/version.png" alt="" v-if="item.version"></h3>
            
            <p class="item-sc" v-if="item.sc>0">观众评：<span>{{item.sc}}</span></p>
            <p class="item-sc" v-else><span>{{item.wish}}</span>人想看</p>
            <p class="item-star">主演：{{item.star}}</p>
            <p class="item-star">{{item.showInfo}}</p>
            <div class="item-ticket" v-if="item.globalReleased">购票</div>
            <div class="item-ticket" v-else style="background:#3c9fe6">预售</div>
        </div>
    </li>
</ul>
</app-content>
</template>

<script>
import {
  getPlayingList,
  getMorePlayingList
} from "../../services/movieService";
export default {
  data() {
    return {
      playingList: [],
      playingIDS: [],
      canLoadMore: true,
    };
  },
  methods: {
    getMoreData() {
      //请求列表的下一页数据
      // 取得ids
      // console.log('加载完毕')
      let ids = [...this.playingIDS];
      ids = ids.splice(this.playingList.length, 10);
      // 组装请求参数
      let movieIds = ids.join(",");
      // 发送请求
      this.canLoadMore = false;
      getMorePlayingList(movieIds).then(result => {
        this.playingList = [...this.playingList, ...result];
        //判断是否加载完了所有的数据
        if (this.playingList.length >= this.playingIDS.length) {
          this.canLoadMore = false; //加载完毕
        } else {
          this.canLoadMore = true; //还可以加载更多
        }
      });
    },
    goMovieCon(id){
      // this.$center.$emit('takemovieId',id);
      // this.$router.push('/movie/moviecon');
      this.$router.push({
        path: "/moviecon",
        name: "movieInfo",
        params: {
          movieId: id
        }
      });
    }
  },
  created() {
    //初始化请求正在热映的电影数据
    getPlayingList().then(({ data, ids }) => {
      this.playingList = data;
      this.playingIDS = ids;

      
      // this.getMoreData();
      // this.getMoreData();
    });
  }
};
</script>

<style lang="scss" scoped>
.playing {
  padding: 0 10px;
  .playing-item {
    display: flex;
    padding: 8px;
    .item-img {
      width: 64px;
    }
    .item-content {
      flex: 1;
      margin-left: 10px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      color: #777;
      .item-name{
        font-size: 17px;
        color:#333;
        font-weight: 700;
        
      }
      p{
        margin-top: 4px
      }
      .item-star {
        font-size: 13px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-pic{
        display: inline-block;
        width: 43px;
        height: 14px;
        margin-left: 10px
      }
      .item-sc {
        font-size: 13px;
        span{
          font-size: 15px;
          color: #faaf00
        }
      }
      .item-ticket {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 12px;
        position: absolute;
        right: 15px;
        top: 30px
      }
    }
  }
}
</style>
