// pages/acadamic/acadamic.js
Page({

  data: {

  },
  
  toacMortcal: function() {
    wx.navigateTo({
      url: '../academicMortcal/academicMortcal',
    })
  },

  toacSavecal: function () {
    wx.navigateTo({
      url: '../academicSavecal/academicSavecal',
    })
  },

  toacBond: function() {
    wx.navigateTo({
      url: '../academicBond/academicBond',
    })
  },
  
  onShareAppMessage: function () {
    return {
      title: "FMHelper, 实用金融数学小助手",
      desc: "生活类工具：房贷计算器, 购车计算器...\n学术类工具：Mortgage, Bond Calculator...",
      path: "/pages/index/index"
    }
  }
})