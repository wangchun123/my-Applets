import { login } from "../../utils/wx-api";
import { request } from "../../request/index.js";

//Page Object
Page({
  data: {},
  //options(Object)
  onLoad: function (options) {},
  bindGetUserInfo: function (e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    login().then((res) => {
      const { code } = res;
      const param = { encryptedData, rawData, iv, signature, code };
      request({ url: "/user/token", data: { ...param }, method: "post" }).then(
        (res) => {
          const { token } = res.data;
          wx.setStorageSync("token", token);
          wx.navigateBack({
            delta: 1,
          });
        }
      );
    });
  },
});
