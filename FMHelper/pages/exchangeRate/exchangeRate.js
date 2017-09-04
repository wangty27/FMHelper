// pages/exchangeRate/exchangeRate.js

var ACD = 0
var BCD = 0

var util = require("../../utils/util.js")

var currentRate
var ChoiceChanged

Page({
  data: {
    CurrencyList:[
      {Choice: "CNY", String: "人民币(CNY)"},
      {Choice: "USD", String: "美元(USD)"},
      {Choice: "CAD", String: "加币(CAD)"},
      {Choice: "EUR", String: "欧元(EUR)"},
      {Choice: "JPY", String: "日元(JPY)"},
      {Choice: "KRW", String: "韩元(KRW)"},
      {Choice: "HKD", String: "港币(HKD)"},
      {Choice: "GBP", String: "英镑(GBP)"},
      {Choice: "AUD", String: "澳元(AUD)"}
    ],
    Aindex: 0,
    Bindex: 1
  },

  onLoad: function (options) {
  },

  ACurrencyChange: function(e){
    ChoiceChange = true
    this.setData({
      Aindex: e.detail.value,
    })
  },

  BCurrencyChange: function (e) {
    ChoiceChange = true
    this.setData({
      Bindex: e.detail.value,
    })
  },

  ACurrencyInput: function (e) {
    ACD = e.detail.value
  },

  BCurrencyInput: function (e) {
    BCD = e.detail.value
  },

  calcFunction: function(e){
    var ACC = this.data.CurrencyList[this.data.Aindex].Choice
    var BCC = this.data.CurrencyList[this.data.Bindex].Choice

    if (!ChoiceChanged){
      if (e.target.id == "AC"){
        BCD = ACD * currentRate
        this.setData({
          BCurrencyValue: BCD.toFixed(2)
        })
      } else if (e.target.id == "BC"){
        ACD = BCD / currentRate
        this.setData({
          ACurrencyValue: ACD.toFixed(2)
        })
      }
    } else{
      wx.request({
        url: 'http://api.k780.com/?app=finance.rate&',
        data: {
          scur: ACC,
          tcur: BCC,
          appkey: '27723',
          sign: '831f45eca062268ffa8ad1b692612f0c'
        },
        success: function(res){
          if (res.data.success == 1) {
            console.log("Success!")
            currentRate = res.data.result.rate
            ChoiceChanged = false
            if (e.target.id == "AC") {
              BCD = ACD * currentRate
              this.setData({
                BCurrencyValue: BCD.toFixed(2)
              })
            } else if (e.target.id == "BC") {
              ACD = BCD / currentRate
              this.setData({
                ACurrencyValue: ACD.toFixed(2)
              })
            }
          } else if (res.data.success == 0) {
            wx.showModal({
              title: '无法获取汇率信息',
              content: '无法获取到汇率信息，可能是API失效，请将问题反馈给开发者',
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '无法获取汇率信息',
              content: '请检查网络连接。如果网络连接正常，还是无法获取到汇率信息，可能是API失效，请将问题反馈给开发者。',
              showCancel: false,
            })
          }
        },
        fail: function(){
          console.log("Failed")
        }
      })
    }

    if (e.target.id == "AC")
    {
      if (!ChoiceChanged){
        BCD = ACD * currentRate
        this.setData({
          BCurrencyValue: BCD.toFixed(2)
        })
      } else{
        ChoiceChanged = false
        wx.request({
          url: 'http://api.k780.com/?app=finance.rate&',
          data: {
            scur: ACC,
            tcur: BCC,
          }
        })
      }
    } else if (e.target.id == "BC"){
      if (!ChoiceChanged){
        ACD = BCD * currentRate
        this.setData({
          ACurrencyValue: ACD.toFixed(2)
        })
      } else{
        ChoiceChanged = false
      }
    }
  }
})