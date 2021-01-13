//Page Object
Page({
  data: {
    userInfo: {},
  },

  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    console.log('userInfo', userInfo)
    this.setData({
      userInfo,
    });
  },
});
