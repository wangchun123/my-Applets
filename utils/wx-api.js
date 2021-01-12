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

/**
 * 打开弹框
 */
export const showModal = ({ title = "", content = "" }) => {
  return new Promise((resovle, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          resovle(result);
        }
      },
    });
  });
};
