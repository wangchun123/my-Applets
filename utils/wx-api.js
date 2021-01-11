/**
 * 获取用户地址
 */
export const chooseAddress = () => {
  return new Promise((resovle, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resovle(result);
      },
    });
  });
};

/**
 * 获取用户权限
 */
export const getSetting = () => {
  return new Promise((resovle, reject) => {
    wx.getSetting({
      success: (result) => {
        resovle(result);
      },
    });
  });
};

/**
 * 打开授权页面
 */
export const openSetting = () => {
  return new Promise((resovle, reject) => {
    wx.openSetting({
      success: (result) => {
        resovle(result);
      },
    });
  });
};
