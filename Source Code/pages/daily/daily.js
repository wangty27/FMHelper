// pages/daily/daily.js
Page({

  data: {
  
  },
  
  toMortcal: function() {
    wx.navigateTo({
      url: '../mortcal/mortcal',
    })
  },

  toCarbuyCA: function () {
    wx.navigateTo({
      url: '../carbuyCA/carbuyCA',
    })
  },

  toCarleaseCA: function () {
    wx.navigateTo({
      url: '../carleaseCA/carleaseCA',
    })
  },

  toExchangeRate: function() {
    wx.navigateTo({
      url: '../exchangeRate/exchangeRate',
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