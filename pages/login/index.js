//Page Object
Page({
  data: {},

  onShow: function () {},
  bindGetUserInfo: function (e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1,
    });
  },
});
