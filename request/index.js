export const request = (param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...param,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
