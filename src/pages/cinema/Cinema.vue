<template>
<div>


        <cinemakinds  @changecinema="updatecinema"/>
    <div class="page" id="cinema">
        
        <app-header title="影院" ></app-header>
        <div class="sub-header">
            <div class="local" @click="localAction">{{city}}</div>
            <div class="search">
                <img src="../../assets/cin-search.png" alt="">
                搜影院
            </div>
        </div>
        <app-content :style="{top: '137px', bottom: '0'}" :canLoadMoreCinema="canLoadMoreCinema" @loadMoreCinema="getMoreCinema" v-if="isShow">
            <ul class="cinema-list">
                <li class="cinema-content" v-for="(item,index) in cinemaList" :key="index">
                    <p class="item-name">{{item.nm}}
                    <span class="item-pricetag" v-if="item.sellPrice"><span class="price-light">{{item.sellPrice}}</span>元起</span>

                    </p>
                    <p class="item-addr">{{item.addr}}</p>
                    <span class="item-distance">{{item.distance}}</span>
                    <p class="cardlist">
                        <span class="card-tui" v-if="item.tag.allowRefund">退</span>
                        <span class="endorse" v-if="item.tag.endorse">改签</span>
                         <span class="snack" v-if="item.tag.snack">小吃</span>
                         <span class="vipTag" v-if="item.tag.vipTag">折扣卡</span>
                         <span class="hallType" v-if="item.tag.hallType" v-for="(val,i) in item.tag.hallType" :key="i">{{item.tag.hallType[i]}}</span>
                    </p>
                    <p class="item-cardchip" v-if="item.promotion.cardPromotionTag">
                        <img src="../../assets/ka.png" alt="">
                        <span>{{item.promotion.cardPromotionTag}}</span>
                    </p>
                </li>
            </ul>
        </app-content>
        <div v-else class="nothing">
          <img src="../../assets/nothing.png" alt="">
          <p>暂无符合条件的影院</p>
        </div>
    </div>
<router-view/>
    </div>
</template>

<script>
import { getCinemaList } from "../../services/cinemaService";
import {mapState,mapActions} from 'vuex';
import FilterCinema from '../common/FilterCinema'
export default {
  components:{
    'cinemakinds':FilterCinema
  },
  data() {
    return {
      cinemaList: [],
      offset:0,
      canLoadMoreCinema:true,
      isShow:true
    };
  },
  computed:{
    ...mapState(['city','cityID'])
  },
  methods: {
    localAction(){
      this.$router.push('/city-list')
    },
    updatecinema(data){
      this.cinemaList=data;
      if(this.cinemaList.length<1){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    },
    getMoreCinema(){
      
      this.offset+=20;
      let offset=this.offset;
      getCinemaList(offset).then(result=>{
        this.cinemaList=[...this.cinemaList,...result]
      })
    }
  },
  created() {
    getCinemaList(this.cityID).then(result => {
      this.cinemaList = result;
    });
  }
};
</script>

<style lang="scss" scoped>
.sub-header {
  background: #f5f5f5;
  position: absolute;
  top: 50px;
  height: 44px;
  width: 100%;
  .local,
  .search {
    float: left;
  }
  .local {
    width: 55px;
    line-height: 44px;
    margin-left: 17px;
    font-size: 15px;
    color: #666;
  }
  .search {
    margin-top: 8px;
    margin-left: 10px;
    width: 279px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    color: #b2b2b2;
    background: #fff;
    border-radius: 5px;
    border: 0.5px solid #e6e6e6;
    text-align: center;
    position: relative;
    img {
      display: inline-block;
      width: 14px;
      height: 14px;
      position: absolute;
      top: 7px;
      left: 103px;
    }
  }
}

.cinema-content {
  padding: 13px 15px 13px 0;
  margin: 0 15px 0 15px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  .item-name {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .item-addr {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: #666;
    width: 278px;
  }
  .item-distance {
    position: absolute;
    right: 15px;
    top: 40px;
    font-size: 13px;
    color: #666;
  }
  .item-pricetag {
    margin-left: 5px;
    color: #f03d37;
    font-size: 11px;
    .price-light {
      font-size: 18px;
    }
  }
  .item-cardchip {
    img {
      width: 15px;
      height: 15px;
      display: inline-block;
      transform: translateY(3px);
    }
    span {
      margin-left: 4px;
      color: #999;
      font-size: 12px;
    }
  }
  .cardlist {
    span {
      padding: 0 3px;
      font-size: 12px;
      border-radius: 2px;
      margin-right: 5px;
    }
    .card-tui,
    .endorse,
    .hallType {
      color: #589daf;
      border: 1px solid #589daf;
    }
    .snack,
    .vipTag {
      color: #f90;
      border: 1px solid #f90;
    }
  }
}
.nothing{
  position: absolute;
  top: 40%;
  left: 32%;
  img{
    width: 70px;
    height: 80px;
    margin-left: 30px
  }
}
</style>

