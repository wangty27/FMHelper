// pages/carbuyCA/carbuyCA.js
Page({

  data: {
    FinanceAmount: "0.00",
    MonthlyPayment: "0.00",
    DeliveryAmount: "0.00",
    FullPrice: 0,
    TradeIn: 0,
    Tax: 0,
    DownPayment: 0,
    Period: 0,
    Interest: 0,
    resetBtnAnimatino: {}
  },

  inputFunction: function(e){
    var id = e.target.id
    if (id == "FullPrice"){
      this.data.FullPrice = e.detail.value
    } else if (id == "TradeIn"){
      this.data.TradeIn = e.detail.value
    } else if (id == "Tax"){
      this.data.Tax = e.detail.value / 100
    } else if (id == "DownPayment"){
      this.data.DownPayment = e.detail.value
    } else if (id == "Period"){
      this.data.Period = e.detail.value
    } else if (id == "Interest"){
      this.data.Interest = e.detail.value / 100
    }
  },

  blurCalc: function() {
    var actPrice = (this.data.FullPrice - this.data.TradeIn) * (1 + this.data.Tax)
    var FA = actPrice - this.data.DownPayment   //Finance Amount
    var ADOD = this.data.DownPayment * 1   //Amount Due on Delivery
    var actlen = this.data.Period
    var actinterest = this.data.Interest / 12
    if (actinterest > 0) {
      var MP = FA / ((1 - (Math.pow((1 + actinterest), (-actlen)))) / actinterest)
      var IP = (MP * actlen + this.data.DownPayment) - actPrice      //Interest Paid
    }
    else if (actinterest <= 0) {
      var MP = FA / actlen
      var IP = 0
    }
    this.setData({
      FinanceAmount: FA.toFixed(2),
      MonthlyPayment: MP.toFixed(2),
      DeliveryAmount: ADOD.toFixed(2)
    })
  },

  resetBtnClick: function() {
    this.setData ({
      FinanceAmount: "0.00",
      MonthlyPayment: "0.00",
      DeliveryAmount: "0.00",
      iFullPrice: "",
      iTradeIn: "",
      iTax: "",
      iDownPayment: "",
      iPeriod: "",
      iInterest: "",
      FullPrice: 0,
      TradeIn: 0,
      Tax: 0,
      DownPayment: 0,
      Period: 0,
      Interest: 0
    })
  }
})