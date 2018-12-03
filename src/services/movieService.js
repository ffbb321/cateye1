import http from "../utils/http";
import API from "../api";

export function getPlayingList() {
  return new Promise((resolve, reject) => {
    http({
      url: API.PLAYING_API,
      method: "GET",
      data: {
        token: ""
      }
    })
      .then(({ data, status }) => {
        if (status == 200) {
          let newData = data.movieList.map(item => {
            let {
              id,
              nm,
              img,
              version,
              sc,
              star,
              showInfo,
              wish,
              globalReleased
            } = item;
            img = img.replace(/w.h/, "64.90");
            return {
              id,
              nm,
              img,
              version,
              sc,
              star,
              showInfo,
              wish,
              globalReleased
            };
          });
          // console.log(newData)
          resolve({
            data: newData,
            ids: data.movieIds
          });
        } else {
        }
      })
      .catch(() => {});
  });
}

export function getMorePlayingList(ids) {
  return new Promise((resolve, reject) => {
    http({
      url: API.MORE_PLAYING_API,
      method: "GET",
      data: {
        token: "",
        movieIds: ids
      }
    })
      .then(({ data, status }) => {
        if (status == 200) {
          // console.log(data);
          //请求成功
          let newData = data.coming.map(item => {
            let {
              id,
              nm,
              img,
              version,
              sc,
              star,
              showInfo,
              wish,
              globalReleased
            } = item;
            img = img.replace(/w.h/, "64.90");
            return {
              id,
              nm,
              img,
              version,
              sc,
              star,
              showInfo,
              wish,
              globalReleased
            };
          });
          resolve(newData);
        } else {
          //请求失败
        }
      })
      .catch(() => {
        //请求失败
      });
  });
}

export function getMostExpectedData(offset) {
  return new Promise((resolve, reject) => {
    http({
      url: API.MOST_EXPECTED_API,
      method: "GET",
      data: {
        ci: 30,
        limit: 10,
        offset,
        token: ""
      }
    })
      .then(({ data, status }) => {
        if (status != 200)
          //请求失败
          return;
        //请求成功

        resolve(data.coming);
      })
      .catch(error => {
        //请求失败
      });
  });
}

export function getComingList() {
  return new Promise((resolve, reject) => {
    http({
      url: API.COMING_API,
      method: "GET",
      data: {
        ci: 30,
        token: "",
        limit: 10
      }
    })
      .then(({ data, status }) => {
        if (status != 200) {
          //请求失败

          return;
        }
        //请求成功
        // 处理即将上映的电影数据
        let newData = data.coming.map(item => {
          //过滤
          let {
            id,
            nm,
            img,
            wish,
            star,
            showInfo,
            version,
            comingTitle,
            rt
          } = item;
          return {
            id,
            nm,
            img,
            wish,
            star,
            showInfo,
            version,
            comingTitle,
            rt
          };
        });
        //按日期进行分类
        let dataMap = {};
        newData.map(item => {
          if (!dataMap[item.comingTitle]) {
            dataMap[item.comingTitle] = [];
          }
          dataMap[item.comingTitle].push(item);
        });
        console.log(newData);
        resolve({
          dataMap,
          ids: data.movieIds
          // origindata:data.coming
          // newData
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
}

export function getMoreComingList(ids) {
  return new Promise((resolve, reject) => {
    http({
      url: API.MORE_PLAYING_API,
      method: "GET",
      data: {
        ci: 30,
        limit: 10,
        token: "",
        movieIds: ids
      }
    })
      .then(({ data, status }) => {
        if (status == 200) {
          console.log(data);
          //请求成功
          let newData = data.coming.map(item => {
            //过滤
            let {
              id,
              nm,
              img,
              wish,
              star,
              showInfo,
              version,
              comingTitle,
              rt
            } = item;
            return {
              id,
              nm,
              img,
              wish,
              star,
              showInfo,
              version,
              comingTitle,
              rt
            };
          });
          resolve({
            newData
          });
        } else {
          //请求失败
        }
      })
      .catch(() => {
        //请求失败
      });
  });
}

export function getMovieCon(movieId) {
  return new Promise((resolve, reject) => {
    http({
      url: API.MOVIECON_API,
      method: "GET",
      data: {
        movieId
      }
    })
      .then(({ data, status }) => {
        if (status != 200)
          //请求失败
          return;
        //请求成功

        resolve(data.detailMovie);
      })
      .catch(error => {
        //请求失败
      });
  });
}

export function getMovieDate(movieId,cityId,forceUpdate) {
  return new Promise((resolve, reject) => {
    http({
      url: API.MOVIEDATA_API,
      method: "POST",
      data: {
        forceUpdate,
        movieId,
        day: 2018 - 11 - 20,
        offset:0,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item: "",
        updateShowDay: true,
        reqId: 1542679623411,
        cityId
      }
    })
      .then(({ data, status }) => {
        if (status != 200)
          //请求失败
          return;
        //请求成功
        // console.log(data);
        resolve({
            showDays:data.showDays.dates,
            cinemas:data.cinemas
        });
      })
      .catch(error => {
        //请求失败
      });
  });
}
