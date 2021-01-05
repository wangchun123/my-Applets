// pages/demo1/demo1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabsData: [
      {
        id: 1,
        title: "首页",
        isActive: true,
      },
      {
        id: 2,
        title: "原创",
        isActive: false,
      },
      {
        id: 3,
        title: "分类",
        isActive: false,
      },
      {
        id: 4,
        title: "关于",
        isActive: false,
      },
    ],
  },

  handelChange: function (e) {
    const { index } = e.detail;

    const tabsData = JSON.parse(JSON.stringify(this.data.tabsData));
    tabsData.forEach((item, idx) =>
      idx === index ? (item.isActive = true) : (item.isActive = false)
    );
    this.setData({
      tabsData,
    });
  },
});
