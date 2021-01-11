import { chooseAddress, getSetting, openSetting } from "../../utils/wx-api";
Page({
  data: {
    addressObj: {},
    cartData: [],
    allChecked: false,
    totalNum: 0,
    totalPrice: 0,
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
    const cartData = wx.getStorageSync("cart") || [];

    this.calcPriceNum(cartData);

    this.setData({
      addressObj,
    });
  },

  calcPriceNum: function (cartData) {
    const allChecked = cartData.length
      ? cartData.every((item) => item.checked)
      : false;

    let totalNum = 0;
    let totalPrice = 0;

    cartData.forEach((item) => {
      if (item.checked) {
        totalPrice += item.num * item.price;
        totalNum += item.num;
      }
    });

    this.setData({
      cartData,
      allChecked,
      totalNum,
      totalPrice,
    });
    wx.setStorageSync("cart", cartData);
  },
  handelCheck: function (e) {
    const { index } = e.target.dataset;
    const newData = JSON.parse(JSON.stringify(this.data.cartData));
    newData[index].checked = !newData[index].checked;
    this.calcPriceNum(newData);
  },
  handelAllCheck: function () {
    let { cartData, allChecked } = this.data;
    allChecked = !allChecked;
    cartData.forEach((item) => (item.checked = allChecked));
    this.calcPriceNum(cartData);
  },
});
