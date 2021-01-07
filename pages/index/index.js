import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    navigateList: [],
  },
  onLoad: function () {
    this.fetchSwiperData();
    this.fetchNavigateData();
  },

  fetchSwiperData: function () {
    request({
      url:
        "https://www.fastmock.site/mock/afa8f2b5a50c33249b6143fcebcfd5e2/wx/api/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message || [],
      });
    });
  },
  fetchNavigateData: function () {
    request({
      url:
        "https://www.fastmock.site/mock/afa8f2b5a50c33249b6143fcebcfd5e2/wx/api/navigation",
    }).then((res) => {
      this.setData({
        navigateList: res.data.list || [],
      });
    });
  },
});
