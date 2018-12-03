<template>
  <div>
    <div :class="{cinemakind:showCinemakind}" @click="isShow"></div>
    <ul class="filternav" ref="filternav">
      <li v-for="(item,i) in kindList" :key="i" @click="chooseState(i)" :class="{active: i == showIndex&&showCinemakind}" class="filternavCon">
        {{item}}
      </li>
    </ul>
    <div class="kindConOne" v-show="kindIndex==0&&showCinemakind" v-if="JSON.stringify(kindCon) !='{}'">
      <ul class="conOneNav">
        <li :class="{active:navIndex==index}" @click="changeNav(index)" v-for="(item,index) in navList" :key="index">{{item}}</li>
      </ul>
      <div v-if="navIndex==0">
        <ul class="conOneLeft">
          <li v-for="(item,index) in kindCon.district.subItems" :key="index" class="conOneLefList" @click="conOneLefchange(index)" :class="{active:index==conOneLefIndex}">
            {{item.name}}({{item.count}})
          </li>
        </ul>
        <ul class="conOneRight">
          <li v-for="(item,index) in kindCon.district.subItems[conOneLefIndex].subItems" :key="index" class="conOneRightList" @click="changePlace(item.id,index,item.name)" :class="{active:index==conOneRightIndex}">
            {{item.name}}
            <span class="conOneCount">{{item.count}}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="conOneLeft">
          <li v-for="(item,index) in kindCon.subway.subItems" :key="index" class="conOneLefList" @click="conOneLefchange(index)" :class="{active:index==conOneLefIndex}">
            {{item.name}}({{item.count}})
          </li>
        </ul>
        <ul class="conOneRight">
          <li v-for="(item,index) in kindCon.subway.subItems[conOneLefIndex].subItems" :key="index" class="conOneRightList" @click="changePlace(item.id,index,item.name)" :class="{active:index==conOneRightIndex}">
            {{item.name}}
            <span class="conOneCount">{{item.count}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="kindConTwo" v-show="kindIndex==1&&showCinemakind" v-if="JSON.stringify(kindCon) !='{}'">
      <ul class="conTwo">
        <li v-for="(item,index) in kindCon.brand.subItems" :key="index" class="conTwoList" @click="changeBrand(index,item.id,item.name)" :class="{active:conTwoIndex==index}">
          {{item.name}}
          <span class="conTwoCount">{{item.count}}</span>
        </li>
      </ul>
    </div>
    <div class="kindConThree" v-show="kindIndex==2&&showCinemakind" v-if="JSON.stringify(kindCon) !='{}'">
      <p>特色功能</p>
      <ul class="conThreeTop">
        <li v-for="(item,index) in kindCon.service.subItems" :key="index" @click="changeservice(index,item.id)" :class="{active:index==serviceIndex}">
          {{item.name}}
        </li>
      </ul>
      <p>特殊厅</p>
      <ul class="conThreeBottom">
        <li v-for="(item,index) in kindCon.hallType.subItems" :key="index" @click="changehallType(index,item.id)" :class="{active:index==hallTypeIndex}">
          {{item.name}}
        </li>
      </ul>
      <div class="conThreeBtn">
        <button class="reset" @click="reset">重置</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { filtercinema, getCinemaList1 } from "../../services/cinemaService";
import { mapState, mapActions } from "vuex";
export default {
  props: {},
  data() {
    return {
      kindList: ["全城", "品牌", "特色"],
      navList: ["商区", "地铁"],
      showIndex: null,
      showCinemakind: false,
      kindCon: {},
      conOneLefIndex: 0,
      conOneRightIndex: -1,
      conTwoIndex: 0,
      navIndex: 0,
      kindIndex: 0,
      serviceIndex:0,
      hallTypeIndex:0,
      params: {},
      serviceId:-1,
      hallTypeId:-1
    };
  },
  computed: {
    ...mapState(["cityID"])
  },
  methods: {
    chooseState(index) {
      if (this.showCinemakind && this.showIndex == index)
        this.showCinemakind = false;
      else this.showCinemakind = true;
      this.showIndex = index;
      this.kindIndex = index;
      filtercinema(this.cityID).then(result => {
        this.kindCon = { ...result };
        // console.log(this.kindCon.brand.subItems);
        // console.log(this.kindCon.district.subItems)
      });
    },
    isShow() {
      if (this.showCinemakind) {
        this.showCinemakind = false;
      } else {
        this.showCinemakind = true;
      }
    },
    conOneLefchange(index) {
      this.conOneLefIndex = index;
      // console.log(this.kindCon.district.subItems[index].id)
      // console.log(this.conOneLefIndex)
    },
    changePlace(areaId, index, name) {
      this.conOneRightIndex = index;
      this.kindList.splice(0, 1, name);
      // console.log(this.districtId);
      this.params.areaId = areaId;
      this.changeData();
      this.isShow();
    },
    changeNav(index) {
      this.navIndex = index;
    },
    changeBrand(index, brandId, name) {
      this.conTwoIndex = index;
      this.kindList.splice(1, 1, name);
      this.params.brandId = brandId;
      this.changeData();
      this.isShow();
    },
    changeservice(index,serviceId){
      this.serviceIndex=index;
      this.serviceId=serviceId;
    },
    changehallType(index,hallTypeId){
      this.hallTypeIndex=index;
      this.hallTypeId=hallTypeId;
    },
    reset(){
      this.serviceIndex=0;
      this.hallTypeIndex=0;
    },
    confirm(){
      this.params.hallTypeId=this.hallTypeId;
      this.params.serviceId=this.serviceId;
      this.changeData()
      this.isShow();
    },
    changeData() {
      getCinemaList1(this.params).then(result => {
        this.$emit("changecinema", result);
      });
      this.data = {};
    }
  }
};
</script>

<style lang="scss">
.cinemakind {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 5;
}
.kindConOne,
.kindConTwo,
.kindConThree {
  width: 375px;
  position: absolute;
  top: 138px;
  background: #fff;
  z-index: 6;
}
.kindConOne {
  height: 442px;
  overflow: hidden;
  .conOneNav {
    display: flex;
    height: 44px;
    border-bottom: 1px solid #eee;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
    }
    .active {
      color: #f03d37;
      border-bottom: 2px solid #f03d37;
    }
  }
  .conOneLeft {
    width: 32%;
    float: left;
    height: 398px;
    overflow: scroll;
  }
  .conOneLefList,
  .conOneRightList {
    height: 44px;
    padding-left: 10px;
    line-height: 44px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &.active {
      color: #f03d37;
      background: #f5f5f5;
    }
  }
  .conOneRight {
    width: 68%;
    height: 100%;
    float: right;
    overflow: scroll;
    background: #f5f5f5;
    .conOneRightList {
      margin-left: 30px;
      .conOneCount {
        float: right;
        margin-right: 30px;
      }
    }
  }
}
.kindConTwo {
  height: 360px;
  overflow: scroll;
  .conTwoList {
    line-height: 44px;
    height: 44px;
    padding: 0 15px 0 26px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 15px;
    .conTwoCount {
      float: right;
      margin-right: 20px;
      font-size: 13px;
    }
  }
}
.kindConThree {
  height: 360px;
  padding-top: 10px;
  color: #777;
  p {
    width: 200px;
    height: 20px;
    margin-left: 12px;
    margin-bottom: 12px;
  }
  li {
    height: 30px;
    padding: 3px 0;
    float: left;
    width: 18%;
    line-height: 30px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 12px;
    font-size: 13px;
    &.active {
      background: #fcf0f0;
      color: #f03d37;
      border: 1px solid #f03d37;
    }
  }
  .conThreeTop {
    height: 48px;
  }
  .conThreeBtn {
    height: 60px;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e5e5e5;
    background: #f5f5f5;
    .confirm,
    .reset {
      height: 34px;
      width: 21.3%;
      margin: 13px 11px;
      border-radius: 6px;
      text-align: center;
      line-height: 34px;
      font-size: 14px;
    }
    .confirm {
      float: right;
      background: #f03d37;
      border: 1px solid #f03d37;
      color: #fff;
    }
    .reset {
      border: 1px solid #e5e5e5;
      color: #777;
      background: #f5f5f5;
    }
  }
}
.filternav {
  height: 40px;
  width: 100%;
  z-index: 5;
  background: #fbfbfb;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 94px;
  font-size: 13px;
  color: #777;
  border-bottom: 4px solid #fbfbfb;
  display: flex;
  .filternavCon {
    flex: 1;
    border-right: 1px solid #eee;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top: 5px solid #777;
      transform: translateY(3px);
      margin-left: 4px;
    }
  }
  .active {
    color: #e54847;
  }
}
</style>

