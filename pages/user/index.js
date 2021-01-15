import { chooseAddress, getSetting, openSetting } from "../../utils/wx-api";
Page({
  data: {
    userInfo: {},
    collectNum: 0,
  },

  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({
      userInfo,
      collectNum: collect.length,
    });
  },
  handelAddAdress: function () {
    getSetting().then((res) => {
      const addresScope = res.authSetting["scope.address"];
      if (addresScope == false) {
        openSetting();
      }
      chooseAddress().then((res) => {
        wx.setStorageSync("adress", {
          ...res,
          all: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`,
        });
      });
    });
  },
  handelCallPhone: function () {
    wx.makePhoneCall({
      phoneNumber: "15757142314",
      success: (result) => {
        console.log("result", result);
      },
    });
  },
});
