// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //接受父组件传的值
    tabsData: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick: function (e) {
      const { index } = e.currentTarget.dataset;
      // const tabsData = JSON.parse(JSON.stringify(this.data.tabsData));
      // tabsData.forEach((item, idx) =>
      //   idx === index ? (item.isActive = true) : (item.isActive = false)
      // );
      // this.setData({
      //   tabsData,
      // });

      this.triggerEvent("handelClick", { index }); //子组件向父组件传值
    },
  },
});
