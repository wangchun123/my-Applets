Page({
  data: {
    swiperList: [],
  },
  onLoad: function () {
    const that = this;
    wx.request({
      url:
        "https://www.fastmock.site/mock/afa8f2b5a50c33249b6143fcebcfd5e2/wx/api/swiperdata",
      success(res) {
        that.setData({
          swiperList: res.data.message || [],
        });
        console.log(res);
      },
    });
  },
});
