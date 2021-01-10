import { request } from "../../request/index.js";
Page({
  data: {
    detailList: {},
  },
  bigImage: {},
  onLoad: function (options) {
    this.fetchDetailData();
  },
  fetchDetailData: function () {
    request({
      url: "/goods/detail",
    }).then((res) => {
      const { list } = res.data;
      this.bigImage = list;
      this.setData({
        detailList: list,
      });
    });
  },
  itemClick: function (e) {
    const { index } = e.currentTarget.dataset;
    const url = this.bigImage.pic.map((item) => item.img_src);
    wx.previewImage({
      current: url[index],
      urls: url,
    });
  },
});
