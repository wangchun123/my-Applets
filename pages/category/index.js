import { request } from "../../request/index.js";

Page({
  data: {
    leftList: [],
    rightList: [],
  },
  categyList: [],
  onLoad: function () {
    this.fetchCategyData();
  },
  fetchCategyData: function () {
    request({ url: "/category" }).then((res) => {
      this.categyList = res.data.list;
      const leftList = this.categyList.map((item) => item.name);
      const rightList = this.categyList[0].children;
      this.setData({
        leftList,
        rightList,
      });
    });
  },
});
