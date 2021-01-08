import { request } from "../../request/index.js";

Page({
  data: {
    leftList: [],
    rightList: [],
    selectIndex: 0,
    topZory: 0,
  },
  categyList: [],
  onLoad: function () {
    //数据缓存
    const Categy = wx.getStorageSync("categy");
    if (!Categy) {
      this.fetchCategyData();
    } else {
      if (Date.now() - Categy.time > 1000 * 60 * 5) {
        this.fetchCategyData();
      } else {
        this.categyList = Categy.data;

        const leftList = this.categyList.map((item) => item.name);
        const rightList = this.categyList[0].children;
        this.setData({
          leftList,
          rightList,
        });
      }
    }
  },
  fetchCategyData: function () {
    request({ url: "/category" }).then((res) => {
      this.categyList = res.data.list;

      wx.setStorageSync("categy", { data: this.categyList, time: Date.now() });

      const leftList = this.categyList.map((item) => item.name);
      const rightList = this.categyList[0].children;
      this.setData({
        leftList,
        rightList,
      });
    });
  },
  handelClick: function (e) {
    const { index } = e.target.dataset;
    const rightList = this.categyList[index].children;
    this.setData({
      selectIndex: index,
      rightList,
      topZory: 0,
    });
    console.log("e", e.target.dataset);
  },
});
