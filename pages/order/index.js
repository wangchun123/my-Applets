import { request } from "../../request/index.js";

Page({
  data: {
    tabsList: [
      {
        id: 1,
        title: "全部",
        isActive: true,
      },
      {
        id: 2,
        title: "代付款",
        isActive: false,
      },
      {
        id: 3,
        title: "代收货",
        isActive: false,
      },
      {
        id: 3,
        title: "退款/退货",
        isActive: false,
      },
    ],
    orderList: [],
  },

  onShow: function (option) {
    const pageParam = getCurrentPages().pop();
    const { type } = pageParam.options;
    this.changeTabsActive(type - 1);
    this.fetchOrderList(type);
  },
  TabsItemClick: function (e) {
    const { index } = e.detail;
    this.changeTabsActive(index);
    this.fetchOrderList(index + 1);
  },
  changeTabsActive: function (index) {
    const newData = JSON.parse(JSON.stringify(this.data.tabsList));
    newData.forEach((item, ix) =>
      index === ix ? (item.isActive = true) : (item.isActive = false)
    );
    this.setData({
      tabsList: newData,
    });
  },
  fetchOrderList: function (type) {
    request({ url: "/order/search", data: { type }, method: "post" }).then(
      (res) => {
        const { list } = res.data;
        this.setData({
          orderList: list,
        });
      }
    );
  },
});
