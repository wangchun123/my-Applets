import { request } from "../../request/index.js";
import { showToast } from "../../utils/wx-api";
Page({
  data: {
    detailList: {},
    isCollect: false,
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

      const collect = wx.getStorageSync("collect") || [];
      const isCollect = collect.some((item) => item.id == list.id);

      this.setData({
        detailList: list,
        isCollect,
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
  handelCollect: function () {
    const collect = wx.getStorageSync("collect") || [];
    let isCollect = false;
    const index = collect.findIndex(
      (item) => item.id == this.data.detailList.id
    );
    if (index != -1) {
      collect.splice(index, 1);
      isCollect = false;
      showToast({ title: "取消收藏", icon: "sucess" });
    } else {
      collect.push(this.data.detailList);
      isCollect = true;
      showToast({ title: "收藏成功", icon: "sucess" });
    }

    this.setData({
      isCollect,
    });

    wx.setStorageSync("collect", collect);
  },
});
