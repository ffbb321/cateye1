<template>
  <div id="moviecon" class="page subpage">
    <app-header :title="data.nm">
      <span slot="left" class="back" @click="backMovie">&lt;</span>
    </app-header>
    <app-content :style="{top:'49px',bottom:0}">
      <div class="movieInfo" v-if="data.nm">
        <div class="movieBg">
          <img :src="data.albumImg " alt="">
        </div>
        <div class="moviepic">
          <img :src="data.img | replaceWH(110, 150)" alt="">
        </div>
        <div class="movieworld">
          <p class="moviename">{{data.nm}}</p>
          <p class="movietip">{{data.enm}}</p>
          <p class="movietip">
            <span class="movieSc">{{data.sc}}</span>（{{data.snum}}人评）</p>
          <p class="movietip">{{data.cat}}</p>
          <p class="movietip">{{data.fra}}/{{data.dur}}分钟</p>
          <p class="movietip">{{data.pubDesc}}</p>
        </div>
      </div>
      <div class="movietimebox">
        <ul class="movietime">
          <li v-for="(items,index) in showDays" :key="index">
            {{items}}</li>
        </ul>
      </div>
      <div class="filtercinema">
        <!-- <filtercinema :style="{top:'232px'}"></filtercinema> -->

      </div>
      <li class="cinema-content" v-for="(item,index) in cinemas" :key="index">
        <p class="item-name">{{item.nm}}
          <span class="item-pricetag" v-if="item.sellPrice">
            <span class="price-light">{{item.sellPrice}}</span>元起</span>

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
        <p class="latelytime">最近场次：{{item.showTimes}}</p>
      </li>
    </app-content>
  </div>
</template>

<script>
import { getMovieCon, getMovieDate } from "../../services/movieService";
import { mapState, mapActions } from "vuex";
import "../../utils/filter";
import filterCinema from "../common/FilterCinema";
export default {
  data() {
    return {
      data: {},
      showDays: [],
      cinemas: []
    };
  },
  components: {
    filtercinema: filterCinema
  },
  methods: {
    backMovie() {
      this.$router.back();
    }
  },
  computed: {
    ...mapState(["city", "cityID"])
  },
  created() {
    let id = this.$route.params.movieId;
    getMovieCon(id).then(result => {
      //   console.log(result);
      this.data = result;
    });
    getMovieDate(id, this.cityID).then(({ showDays, cinemas }) => {
      //   console.log(cinemas[0].nm);
      for (var i = 0; i < showDays.length; i++) {
        this.showDays.push(showDays[i].date);
      }
      this.cinemas = cinemas;
    });
  }
  // mounted(){
  //     this.$center.$on('takemovieId',(id)=>{
  //         this.movieid=id;
  //     })
  // }
};
</script>
<style lang="scss" scoped>
#moviecon {
  bottom: -49px;
  overflow: hidden;
  background: #fff;
}
.back {
  width: 80px;
  height: 40px;
  font-size: 25px;
}
.movieInfo {
  width: 100%;
  height: 150px;
  overflow: hidden;
  padding: 19px 30px 19px 15px;
  background-color: rgba($color: #000, $alpha: 0.65);
  .movieBg {
    position: absolute;
    height: 150px;
    width: 100%;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .moviepic {
    position: absolute;
    width: 110px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .movieworld {
    position: absolute;
    width: 200px;
    height: 150px;
    top: 18px;
    left: 140px;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    .moviename {
      font-size: 20px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .movietip {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      margin-top: 7px;
      opacity: 0.8;
    }
    .movieSc {
      color: #fc0;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
.movietimebox {
  height: 43px;
  line-height: 42px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  .movietime {
    height: 43px;
    overflow-x: scroll;
    white-space: nowrap;
    overflow-y: hidden;
    li {
      width: 115px;
      height: 43px;
      display: inline-block;
      margin-left: 4.5px;
      font-size: 14px;
      text-align: center;
      // list-style: none;
      color: #666;
    }
  }
}
.filtercinema {
  height: 44px;
  border-bottom: 1px solid #eee;
}
.cinema-content {
  padding: 13px 15px 13px 0;
  margin: 0 15px 0 15px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  .item-name {
    font-size: 16px;
  }
  .item-addr,
  .latelytime {
    margin-top: 5px;
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
    margin: 5px 0 5px 0;
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
  .latelytime {
  }
}
</style>

