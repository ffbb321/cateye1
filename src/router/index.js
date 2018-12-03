import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Movie from "../pages/movie/Movie";
import Cinema from "../pages/cinema/Cinema";
import Mine from "../pages/mine/Mine";
import CityList from "../pages/common/CityList";
import Moviecon from '../pages/moviecon/MovieCon'

export default new Router({
  routes: [
    {
      path: "/movie",
      component: Movie,
    },
    {
      path:'moviecon',
      name:'movieInfo',
      component:Moviecon
    },
    {
      path: "/cinema",
      component: Cinema
      // children:[
      //   {
      //     path:'city-list',
      //     component:CityList
      //   }
      // ]
    },
    {
      path: "/mine",
      component: Mine
    },
    { 
      path: "/city-list", 
      component: CityList },
    {
      path: "**",
      redirect: "/movie"
    }
  ]
});
