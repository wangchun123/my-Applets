Page({
  data: {
    tabsList: [
      {
        id: 1,
        title: "商品收藏",
        isActive: true,
      },
      {
        id: 2,
        title: "品牌收藏",
        isActive: false,
      },
      {
        id: 3,
        title: "店铺收藏",
        isActive: false,
      },
      {
        id: 4,
        title: "浏览足迹",
        isActive: false,
      },
    ],
    collectGoods: [],
  },

  onShow: function () {
    const pageType = getCurrentPages();
    const { type } = pageType.pop().options;
    this.changeTabsActive(type - 1);

    const collectGoods = wx.getStorageSync("collect");
    this.setData({
      collectGoods,
    });
  },
  TabsItemClick: function (e) {
    const { index } = e.detail;
    this.changeTabsActive(index);
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
});
