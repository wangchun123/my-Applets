import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    navigateList: [],
    floorList: [],
  },
  onLoad: function () {
    this.fetchSwiperData();
    this.fetchNavigateData();
    this.fetchFloorData();
  },

  fetchSwiperData: function () {
    request({
      url: "/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message || [],
      });
    });
  },
  fetchNavigateData: function () {
    request({
      url: "/navigation",
    }).then((res) => {
      this.setData({
        navigateList: res.data.list || [],
      });
    });
  },
  fetchFloorData: function () {
    request({
      url: "/floor",
    }).then((res) => {
      this.setData({
        floorList: res.data.list || [],
      });
    });
  },
});
