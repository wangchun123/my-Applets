import { request } from "../../request/index.js";

Page({
  data: {
    value: "",
    isShowCancel: false,
    searchList: [],
  },
  timer: null,
  onShow: function () {},

  handelInputChange: function (e) {
    const { value } = e.detail;
    this.setData({
      value,
    });

    if (!value.trim()) {
      this.setData({
        isShowCancel: false,
        searchList: [],
      });
      return;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fetchSearchList(value);
    }, 1000);

    this.setData({
      isShowCancel: true,
    });
  },
  handelCancel: function () {
    this.setData({
      value: "",
      searchList: [],
      isShowCancel: false,
    });
  },
  fetchSearchList: function (value) {
    if (!this.data.value) return;
    request({ url: "/goods/search", data: { pagenum: 1 } }).then((res) => {
      const { data } = res.data.list;
      this.setData({
        searchList: data,
      });
    });
  },
});
