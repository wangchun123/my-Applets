export const request = (param) => {
  return new Promise((resolve, reject) => {
    const baseUrl =
      "https://www.fastmock.site/mock/afa8f2b5a50c33249b6143fcebcfd5e2/wx/api";
    wx.request({
      ...param,
      url: baseUrl + param.url,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
