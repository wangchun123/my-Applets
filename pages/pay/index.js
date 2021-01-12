import { request } from "../../request/index.js";
import { requestPayment, showToast } from "../../utils/wx-api";
Page({
  data: {
    addressObj: {},
    cartData: [],
    totalNum: 0,
    totalPrice: 0,
  },

  onShow: function () {
    const addressObj = wx.getStorageSync("adress");
    let cartData = wx.getStorageSync("cart") || [];
    cartData.filter((item) => item.checked);

    let totalNum = 0;
    let totalPrice = 0;

    cartData.forEach((item) => {
      totalPrice += item.num * item.price;
      totalNum += item.num;
    });

    this.setData({
      addressObj,
      cartData,
      totalNum,
      totalPrice,
    });
  },
  handelOrderPay: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
    } else {
      request({ url: "/orders/create", method: "post" }).then((res) => {
        const { order_num } = res.data;
        showToast({ title: "支付功能暂未开通" });
        requestPayment({
          timeStamp: "1",
          nonceStr: "2",
          package: "3",
          signType: "4",
          paySign: "5",
        });
      });
    }
  },
});
