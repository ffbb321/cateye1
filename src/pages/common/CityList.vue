<template>
    <div id="city-list" class="page subpage">
        <app-content :style="{top:0,bottom:0}" ref="content">
            <div v-for="item in data" :key="item.key" ref="list">
                <h6 :style="{background: '#EBEBEB', lineHeight: '30px'}">{{item.key}}</h6>
                <ul>
                    <li v-for="city in item.value" :key="city.id" 
                        @click="selectCityAction(city)"
                        :style="{lineHeight: '40px', borderBottom: '1px solid #D6D6D9'}">
                        {{city.nm}}
                    </li>
                </ul>
            </div>
        </app-content>
        <div class="nav-bar">
            <span class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
                {{item}}
            </span>
        </div>
    </div>
</template>

<script>
import { getCityList } from "../../services/appService";
import {mapState,mapActions} from 'vuex'
export default {
  name: "citylist",
  data() {
    return {
      keys: [],
      data: []
    };
  },
  methods: {
    ...mapActions(['selectCity']),
    btnAction(index) {
    //   console.log(this.$refs.list);
    this.$refs.content.refresh();
      let height = 0;
      for (let i = 0; i < this.$refs.list.length; i++) {
        if (i < index) {
          height += this.$refs.list[i].offsetHeight;
        } else {
          break;
        }
      }
      this.$refs.content.scrollTo(height);
    },
    selectCityAction(city){
        this.selectCity({
            id:city.id,
            city:city.nm
        });
        this.$router.back();
    }
  },
  created() {
    getCityList().then(({ newData, keys }) => {
      this.keys = keys;
      this.data = newData;
    });
  }
};
</script>

<style lang="scss" scoped>
#city-list {
  position: absolute;
  bottom: -49px;
  background: #f5f5f5;
}
.nav-bar {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.nav-bar .nav-item {
  display: block;
  font-size: 14px;
  padding: 0px 6px;
}
</style>

