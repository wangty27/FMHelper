//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },

  onShareAppMessage: function () {
    return {
      title: "FMHelper, 实用金融数学小助手",
      desc: "生活类工具：房贷计算器, 购车计算器...\n学术类工具：Mortgage, Bond Calculator...",
      path: "/pages/index/index"
    }
  }
})