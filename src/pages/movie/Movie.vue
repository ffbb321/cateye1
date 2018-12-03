<template>
    <div class="page" id="movie">
        <app-header title="猫眼电影" ></app-header>
        <div class="sub-header">
            <span class="city-icon" @click="goCityList()">{{city}}</span>
            <nav class="nav">
                 <li v-for="(item, index) in navList" :key="index" 
                @click="changeAction(index)"
                :class="{active: index == navIndex}">
                {{item}}
                </li>
            </nav>
            <span class="search-icon">
              <img src="../../assets/search.png" alt="">
            </span>
        </div>
        <keep-alive>
          <playing v-if="navIndex==0"/>
          <coming v-if="navIndex==1"/>
        </keep-alive>
        <router-view/>
    </div>
</template>

<script>
import Coming from '../../components/movie/Coming'
import Playing from '../../components/movie/Playing'
import {mapState,mapActions} from 'vuex'
export default {
  components:{
    'coming':Coming,
    'playing':Playing 
  },
  data() {
    return {
      navList: ["正在热映", "即将上映"],
      navIndex: 0,
    }
  },
  computed:{
    ...mapState(['city'])
  },
  methods: {
    changeAction(index) {
      this.navIndex = index;
    },
    goCityList(){
      this.$router.push('/city-list')
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-header {
  width: 100%;
  height: 44px;
  position: absolute;
  top: 44px;
  left: 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  .city-icon {
    text-align: center;
    height: 20px;
    position: relative;
    top: 14px;
    width: 104px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-top: 4px solid #666;
      margin-left: 4px;
      transform: translateY(0px);
    }
  }
  .nav {
    // width: 250px;
    display: flex;
    color: #666;
    font-size: 15px;
    li {
      width: 80px;
      margin: 0 12px;
      text-align: center;
      line-height: 50px;
      &.active {
        color: #f03d37;
        font-weight: 600;
        border-bottom: 2px solid #f03d37;
      }
    }
  }
  .search-icon img {
    width: 20px;
    margin: 15px 12px;
  }
}
</style>
