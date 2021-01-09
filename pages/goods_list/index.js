import { request } from "../../request/index.js";

Page({
  data: {
    tabsList: [
      {
        id: 1,
        title: "综合",
        isActive: true,
      },
      {
        id: 2,
        title: "销量",
        isActive: false,
      },
      {
        id: 3,
        title: "价格",
        isActive: false,
      },
    ],
    goodsList: [],
  },
  queryParam: {
    pagenum: 1,
    pagesize: 10,
    id: "",
  },
  totalPage: 1,
  onLoad: function (options) {
    this.queryParam.id = options.id;
    this.fetchGoodsData();
  },
  TabsItemClick: function (e) {
    const { index } = e.detail;
    const newData = JSON.parse(JSON.stringify(this.data.tabsList));
    newData.forEach((item, ix) =>
      index === ix ? (item.isActive = true) : (item.isActive = false)
    );
    this.setData({
      tabsList: newData,
    });
  },
  fetchGoodsData: function () {
    request({ url: "/goods/search", data: this.queryParam }).then((res) => {
      const { data, total } = res.data.list;
      this.totalPage = Math.ceil(total / this.queryParam.pagesize);
      this.setData({
        goodsList: [...this.data.goodsList, ...data],
      });
      wx.stopPullDownRefresh();
    });
  },
  onReachBottom: function () {
    if (this.queryParam.pagenum >= this.totalPage) {
      wx.showToast({
        title: "没有下一页数据了",
      });
    } else {
      console.log("object", "有下一页");
      this.queryParam.pagenum++;
      this.fetchGoodsData();
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      goodsList: [],
    });
    this.queryParam.pagenum = 1;
    this.fetchGoodsData();
  },
});
