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
  handelCartAdd: function () {
    let carts = wx.getStorageSync("cart") || [];
    let index = carts.findIndex((v) => v.id === this.data.detailList.id);
    if (index === -1) {
      const newObj = JSON.parse(JSON.stringify(this.data.detailList));
      carts.push({ ...newObj, num: 1, checked: true });
    } else {
      carts[index].num++;
    }

    wx.setStorageSync("cart", carts);
    wx.showToast({
      title: "添加成功",
      icon: "sucess",
      mask: true,
    });
  },
});
