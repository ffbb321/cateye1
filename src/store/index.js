import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '深圳',
    cityID: 30
  },
  mutations: {
    setCity(state, value){
      state.city = value;
    },
    setCityID(state, value){
      state.cityID = value;
    }
  },
  actions: {
    selectCity(context, params){
      context.commit('setCity', params.city);
      context.commit('setCityID', params.id);
    }
  }
})
