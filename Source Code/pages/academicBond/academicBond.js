// pages/academicBond/academicBond.js
Page({
  data: {
    resultData: "0.000000",
    resultText: "Yield to Maturity",
    FaceValue: 0,
    PricePaid: 0,
    CouponRate: 0,
    TimetoMaturity: 0
  },

  inputFunction: function(e){
    var id = e.target.id
    if (id == "FaceValue"){
      this.data.FaceValue = e.detail.value
    } else if (id == "PricePaid"){
      this.data.PricePaid = e.detail.value
    } else if (id == "CouponRate"){
      this.data.CouponRate = e.detail.value / 100
    } else if (id == "TimetoMaturity"){
      this.data.TimetoMaturity = e.detail.value
    }
  },

  calcFunction: function(){
    var FV = this.data.FaceValue
    var PP = this.data.PricePaid
    var CR = this.data.CouponRate
    var TM = this.data.TimetoMaturity
    var Yield = (CR * FV + (FV - PP) / (TM)) / (PP)
    this.setData({
      resultData: Yield.toFixed(6)
    })
  },

  resetBtnClick: function(){
    this.setData({
      resultData: "0.000000",
      FaceValue: 0,
      PricePaid: 0,
      CouponRate: 0,
      TimetoMaturity: 0,
      inputValue: ""
    })
  }

})