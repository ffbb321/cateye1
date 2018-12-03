const SAT_HOST = 'http://localhost:8080';
const UAT_HOST = 'http://m.maoyan.com';
const PRO_HOST = 'http://m.maoyan.com';

/*
正在热映的接口
参数：token：可选，用户标识
     movieIds：可选，需要请求的电影id列表，如果没有，请求第一页数据
*/
const PLAYING_API = '/ajax/movieOnInfoList';


const MORE_PLAYING_API = '/ajax/moreComingList';
/*
即将上映的接口
参数：ci 城市id
     token 用户标识
     limit 数据长度

*/
const COMING_API = '/ajax/comingList';

const MOST_EXPECTED_API = '/ajax/mostExpected';


/* 影院信息接口*/
const CINEMA_API='/ajax/cinemaList' ;


/*城市列表数据*/
const CITYLIST_API='/dianying/cities.json';

/*筛选地区数据 http://m.maoyan.com/ajax/filterCinemas?ci=10*/
 const FILTERCITY_API='/ajax/filterCinemas'

/*电影详情数据*/
const MOVIECON_API='/ajax/detailmovie'  

/*电影详情页日期数据     ?forceUpdate=1542679627357*/
const MOVIEDATA_API='/ajax/movie' 
export default{
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    MOST_EXPECTED_API,
    COMING_API,
    CINEMA_API,
    CITYLIST_API,
    FILTERCITY_API,
    MOVIECON_API,
    MOVIEDATA_API
}