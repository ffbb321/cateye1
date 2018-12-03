import http from "../utils/http";
import API from "../api";

export function getCinemaList(ci, offset,districtId,areaId,brandId) {
  return new Promise((resolve, reject) => {
    http({
      url: API.CINEMA_API,
      method: "GET",
      data: {
        ci,
        token: "",
        limit: 10,
        offset,
        day: 2018 - 11 - 23,
        districtId,
        lineId: -1,
        hallType: -1,
        brandId,
        serviceId: -1,
        areaId,
        stationId: -1,
        item: "",
        updateShowDay: false,
        reqId:-1,
      }
    })
      .then(({ data, status }) => {
        if (status != 200)
          //请求失败
          return;
        //请求成功
        // console.log(data.cinemas)
        resolve(data.cinemas);
      })
      .catch(error => {
        //请求失败
      });
  });
}

export function getCinemaList1(data) {
    return new Promise((resolve, reject) => {
      http({
        url: API.CINEMA_API,
        method: "GET",
        data,
      })
        .then(({ data, status }) => {
          if (status != 200)
            //请求失败
            return;
          //请求成功
          // console.log(data.cinemas)
          resolve(data.cinemas);
        })
        .catch(error => {
          //请求失败
        });
    });
  }
export function filtercinema(ci) {
  return new Promise((resolve, reject) => {
    http({
      url: API.FILTERCITY_API,
      method: "GET",
      data: {
        ci
      }
    })
      .then(({ data, status }) => {
        if (status != 200) {
          return;
        } else {
          resolve(data);
        }
      })
      .catch(error => {});
  });
}
