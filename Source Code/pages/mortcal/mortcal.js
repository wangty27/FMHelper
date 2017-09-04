//index.js
//获取应用实例
var app = getApp()
var paymentTC = -1
Page({
  data: {
    FullPrice: "0.00",
    DownPay: "0.00",
    Mortamount: "0.00",
    MonthPay: "0.00",
    InterestPay: "0.00",
    Period: 0,
    Ratio: 0,
    InterestRate: 0,
    Area: 0,
    Price: 0,
    Tax: 0,
    index: 0,
  },
  //用户名和密码输入框事件

  inputFunction: function(e){
    var id = e.target.id
    if (id == "Period"){
      this.data.Period = e.detail.value
    } else if (id == "Ratio"){
      this.data.Ratio = e.detail.value
    } else if (id == "InterestRate"){
      this.data.InterestRate = e.detail.value
    } else if (id == "Area"){
      this.data.Area = e.detail.value
    } else if (id == "Price"){
      this.data.Price = e.detail.value
    } else if (id == "Tax"){
      this.data.Tax = e.detail.value
    }
  },

  paymentTypeChange: function() {
    var actlen = this.data.Period * 12
    var actinterest = this.data.InterestRate / 100
    var actratio = this.data.Ratio / 100
    var tax = this.data.Tax / 100
    var FP = this.data.Area * this.data.Price      //FullPrice
    var MA = FP * actratio     //Mortgage Amount
    var DP = FP - MA    //Down Payment
    if (paymentTC == 0) {
      if (tax <= 0 && actinterest > 0) {
        var MP = MA / ((1 - (Math.pow((1 + actinterest / 12), (-actlen)))) / (actinterest / 12))
        var IP = (MP * actlen + DP) - FP      //Interest Paid
      }
      else if (tax > 0 && actinterest > 0) {
        var MP = MA / ((1 - (Math.pow((1 + actinterest / 12), (-actlen)))) / (actinterest / 12)) * (1 + tax)
        var MPWT = MA / ((1 - (Math.pow((1 + actinterest / 12), (-actlen)))) / (actinterest / 12))    //Monthly Payment without interest
        var IP = (MPWT * actlen + DP) - FP      //Interest Paid
      }
      else if (tax <= 0 && actinterest <= 0) {
        var MP = MA / actlen
        var IP = 0
      }
      else if (tax > 0 && actinterest <= 0) {
        var MP = MA / actlen * (1 + tax)
        var IP = 0
      }
      this.setData({
        FullPrice: FP.toFixed(2),
        DownPay: DP.toFixed(2),
        Mortamount: MA.toFixed(2),
        MonthPay: MP.toFixed(2),
        InterestPay: IP.toFixed(2),
        MPTail: "",
        MPTailText: "",
      })
    }
    else if (paymentTC == 1) {
      if (tax <= 0 && actinterest > 0) {
        var MP = (MA / actlen) + (MA * (actinterest / 12))
        var MPDecrease = (MA / actlen) * (actinterest / 12)
        var IP = (actlen + 1) * MA * (actinterest / 12) / 2
      }
      else if (tax > 0 && actinterest > 0) {
        var MP = ((MA / actlen) + (MA * (actinterest / 12))) * (1 + tax)
        var MPDecrease = (MA / actlen) * (actinterest / 12) * (1 + tax)
        var IP = (actlen + 1) * MA * (actinterest / 12) / 2
      }
      else if (tax <= 0 && actinterest <= 0) {
        var MP = MA / actlen
        var MPDecrease = 0
        var IP = 0
      }
      else if (tax > 0 && actinterest <= 0) {
        var MP = MA / actlent * (1 + tax)
        var MPDecrease = 0
        var IP = 0
      }
      this.setData({
        FullPrice: FP.toFixed(2),
        DownPay: DP.toFixed(2),
        Mortamount: MA.toFixed(2),
        MonthPay: MP.toFixed(2),
        MPTail: MPDecrease.toFixed(2),
        MPTailText: "每月递减(元)",
        InterestPay: IP.toFixed(2)
      })
    }
  },

  paymentTypePI: function () {
    paymentTC = 0
    this.setData({
      samePIBack: "white",
      samePIColor: "rgb(115, 103, 155)",
      samePBack: "",
      samePColor: "white",
    })
    this.paymentTypeChange()
  },

  paymentTypeP: function () {
    paymentTC = 1
    this.setData({
      samePBack: "white",
      samePColor: "rgb(115, 103, 155)",
      samePIBack: "",
      samePIColor: "white"
    })
    this.paymentTypeChange()
  },

  blurCalc: function () {
    var actlen = this.data.Period * 12
    var actinterest = this.data.InterestRate / 100
    var actratio = this.data.Ratio / 100
    var tax = this.data.Tax / 100
    var FP = this.data.Area * this.data.Price      //FullPrice
    var MA = FP * actratio     //Mortgage Amount
    var DP = FP - MA    //Down Payment
    if (paymentTC == 0)
    {
      if (tax <= 0 && actinterest > 0) 
      {
        var MP = MA / ((1 - (Math.pow( (1 + actinterest / 12),(-actlen) ))) / (actinterest / 12))
        var IP = (MP * actlen + DP) - FP      //Interest Paid
      }
      else if (tax > 0 && actinterest > 0)
      {
        var MP = MA / ((1 - (Math.pow((1 + actinterest / 12), (-actlen)))) / (actinterest / 12)) * (1 + tax)
        var MPWT = MA / ((1 - (Math.pow((1 + actinterest / 12), (-actlen)))) / (actinterest / 12))    //Monthly Payment without interest
        var IP = (MPWT * actlen + DP) - FP      //Interest Paid
      }
      else if (tax <= 0 && actinterest <= 0)
      {
        var MP = MA / actlen
        var IP = 0
      }
      else if (tax > 0 && actinterest <= 0)
      {
        var MP = MA / actlen * (1 + tax)
        var IP = 0
      }
      this.setData({
        FullPrice: FP.toFixed(2),
        DownPay: DP.toFixed(2),
        Mortamount: MA.toFixed(2),
        MonthPay: MP.toFixed(2),
        InterestPay: IP.toFixed(2)
      })
    }
    else if (paymentTC == 1)
    {
      if (tax <= 0 && actinterest > 0)
      {
        var MP = (MA / actlen) + (MA * (actinterest / 12))
        var MPDecrease = (MA / actlen) * (actinterest / 12)
        var IP = (actlen + 1) * MA * (actinterest / 12) / 2
      }
      else if (tax > 0 && actinterest > 0)
      {
        var MP = ((MA / actlen) + (MA * (actinterest / 12))) * (1 + tax)
        var MPDecrease = (MA / actlen) * (actinterest / 12) * (1 + tax)
        var IP = (actlen + 1) * MA * (actinterest / 12) / 2
      }
      else if (tax <= 0 && actinterest <= 0) 
      {
        var MP = MA / actlen * 1
        var MPDecrease = 0
        var IP = 0
      }
      else if (tax > 0 && actinterest <= 0) 
      {
        var MP = MA / actlent * (1 + tax) * 1
        var MPDecrease = 0
        var IP = 0
      }
      this.setData({
        FullPrice: FP.toFixed(2),
        DownPay: DP.toFixed(2),
        Mortamount: MA.toFixed(2),
        MonthPay: MP.toFixed(2),
        MPTail: MPDecrease.toFixed(2),
        MPTailText: "每月递减(元)",
        InterestPay: IP.toFixed(2)
      })
    }
  },

  resetBtnClick: function () {
    this.setData({
      FullPrice: "0.00",
      DownPay: "0.00",
      Mortamount: "0.00",
      MonthPay: "0.00",
      InterestPay: "0.00",
      MPTail: "",
      samePBack: "",
      samePColor: "white",
      samePIBack: "",
      samePIColor: "white",
      MPTailText: "",
      iPeriod: "",
      iRatio: "",
      iInterestRate: "",
      iArea: "",
      iPrice: "",
      iTax: "",
      Period: 0,
      Ratio: 0,
      InterestRate: 0,
      Area: 0,
      Price: 0,
      Tax: 0,
      index: 0
    })
    paymentTC = -1
  }
  
})