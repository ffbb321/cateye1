<template>
<app-content :style="{top: '88px', bottom: '0', background:'#f5f5f5'}" @load="getMoreComingData" :canLoadComingMore="canLoadComingMore">
<div class="expected">
    <p class="expected-title">近期最受期待</p>
    <scroll class="expected-list" @loadMore="getMoreExpected">
        <li class="expected-item" v-for="item in expectedList" :key="item.id">
            <div class="item-pic">
                <img :src="item.img | replaceWH(170, 230)">
                <div class="item-wishBg">
                    <p class="item-wish">{{item.wish}}人想看</p>
                </div>
            </div>
            <p class="item-name">{{item.nm}}</p>
            <p class="item-date">{{item.comingTitle}}</p>
        </li>
    </scroll>
</div>

<div class="coming">
    <div v-for="(list, key) in comingMap " :key="key">
        <p class="coming-key">{{key}}</p>
        <scroll class="coming-list" >
            <li v-for="item in list" :key="item.id" class="coming-item">
                <img :src="item.img | replaceWH(170, 230)">
                <div class="coming-message">
                    <p class="coming-name">{{item.nm}}</p>
                    <p class="coming-wish"><span>{{item.wish}}</span>人想看</p>
                    <p class="coming-star">主演：{{item.star}}</p>
                    <p class="coming-date">{{item.rt}}上映</p>
                    <div class="coming-buy" v-if="item.showInfo" style="background:#3c9fe6">预售</div>
                    <div class="coming-buy" v-else >想看</div>
                </div>
            </li>
        </scroll>
    </div>
</div>
</app-content>
</template>

<script>
import {
  getComingList,
  getMostExpectedData,
  getMoreComingList
} from "../../services/movieService";
import "../../utils/filter";
import index from '../../api';
export default {
  data() {
    return {
      comingMap: [],
      expectedList: [],
      comingId:[],
      canLoadComingMore:true,
      offset:0,
    };
  },
  methods:{
    getMoreComingData(){
      // let ids = [...this.comingId];
      // ids = ids.splice(this.origindata.length, 10);
      // // 组装请求参数
      // let comingIds = ids.join(",");
      // // 发送请求
      // this.canLoadComingMore = false;
      // getMoreComingList(comingIds).then(result => {
      //   this.comingMap=[...this.comingMap,...result]
        
      //   //判断是否加载完了所有的数据
      //   if (this.comingMap.length >= this.comingId.length) {
      //     this.canLoadComingMore = false; //加载完毕
      //   } else {
      //     this.canLoadComingMore = true; //还可以加载更多
      //   }
      // });
    },
    getMoreExpected(){
      this.offset+=10;
      let offset=this.offset;
      getMostExpectedData(offset).then(result=>{
        this.expectedList=[...this.expectedList,...result]
      })
    }
  },
  created() {
    // 请求即将上映的数据
    getComingList().then(({dataMap,ids}) => {
      this.comingMap = dataMap;
      this.comingId=ids;
      // this.origindata=origindata;
    });
    getMostExpectedData().then(result => {
      this.expectedList = result;
    });
  }
};
</script>
<style lang="scss" scoped>
.expected {
  padding: 12px 0 12px 15px;
  margin-bottom: 10px;
  background: #fff;
  .expected-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
  }
  .expected-item {
    display: inline-block;
    margin-right: 15px;
    .item-pic {
      position: relative;
      margin-bottom: 6px;
      .item-wishBg {
        height: 35px;
        width: 100%;
        background: linear-gradient(
          rgba($color: #333, $alpha: 0),
          rgba($color: #333, $alpha: 1)
        );
        position: absolute;
        bottom: 0;
        .item-wish {
          position: absolute;
          left: 4px;
          bottom: 2px;
          color: #faaf00;
          font-size: 11px;
          font-weight: 600;
        }
      }
      img {
        width: 85px;
        height: 115px;
      }
    }
    .item-name {
      font-size: 13px;
      color: #222;
      font-weight: 600;
      margin-bottom: 2px;
      width: 85px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-date {
      font-size: 12px;
      color: #999;
      width: 81px;
      overflow: hidden;
      // text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.coming {
  background: #fff;
  .coming-key {
    padding: 10px;
    font-size: 14px;
    color: #333;
  }
  .coming-item {
    height: 100px;
    width: 340px;
    display: flex;
    padding: 0 15px 5px 15px;
    img {
      display: block;
      width: 64px;
      height: 90px;
    }
    .coming-message {
      margin-left: 10px;
      flex: 1;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      p{
          font-size: 13px;
          color: #666;
          margin-bottom: 4px
      }
      .coming-name {
        font-size: 17px;
        color: #333;
        font-weight: 700;
      }
      .coming-wish span{
          color: #faaf00;
          font-size: 15px;
          font-weight: 600
      }
      .coming-star{
          width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .coming-buy{
           width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        background:#faaf00;
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

