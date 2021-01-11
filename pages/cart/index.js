import { chooseAddress, getSetting, openSetting } from "../../utils/wx-api";
Page({
  data: {
    addressObj: {},
    cartData: [],
  },

  onLoad: function (options) {},

  handelAddAdress: function () {
    getSetting().then((res) => {
      const addresScope = res.authSetting["scope.address"];
      if (addresScope == false) {
        openSetting();
      }
      chooseAddress().then((res) => {
        this.setData({
          addressObj: {
            ...res,
            all: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`,
          },
        });
        wx.setStorageSync("adress", {
          ...res,
          all: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`,
        });
      });
    });
  },
  onShow: function () {
    const addressObj = wx.getStorageSync("adress");
    const cartData = wx.getStorageSync("cart");
    console.log('cartData', cartData)
    this.setData({
      addressObj,
      cartData,
    });
  },
});
