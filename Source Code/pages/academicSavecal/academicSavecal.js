// pages/academicSavecal/academicSavecal.js

var resultChoice = ""
var annuityChoice = ""

var FutureValue = 0
var Principle = 0
var InterestRate = 0
var PeriodicPayment = 0
var NumberofPeriods = 0
var PeriodsperYear = 0

Page({
  data: {
    resultData: "0.0000",
    resultText: "Result",
    Parameter1: "Parameter",
    Parameter2: "Parameter",
    Parameter3: "Parameter",
    Parameter4: "Parameter",
    HideParameter4: false,
    Parameter5: "Parameter",
    calcList: [
      {
        target:"FV",
        parameter:["Principle", "Interest Rate(%)", "Periodic Payment", "Number of Periods"]
      }, 
      {
        target: "PP",
        parameter: ["Principle", "Interest Rate(%)", "Future Value", "Number of Periods"]
      },
      {
        target: "FV",
        parameter: ["Principle", "Interest Rate(%)", "Periodic Payment", "Future Value"]
      }
    ]
  },

  annuityChoice: function (e) {
    var choice = e.target.id
    if (choice == "annuity-OA") {
      annuityChoice = "OA"
      this.setData({
        OABack: "#FFFFFF",
        OAColor: "#73689B",
        ADBack: "",
        ADColor: "#FFFFFF",
      })
    } else if (choice == "annuity-AD") {
      annuityChoice = "AD"
      this.setData({
        OABack: "",
        OAColor: "#FFFFFF",
        ADBack: "#FFFFFF",
        ADColor: "#73689B"
      })
    }
    this.calcFunction()
  },

  resultChoice: function (e) {
    var choice = e.target.id
    annuityChoice = ""
    this.setData({
      resultData: "0.0000",
      OABack: "",
      OAColor: "#FFFFFF",
      ADBack: "",
      ADColor: "#FFFFFF",
      PValue: "",
      Parameter3: "Periods Per Year"
    })
    if (choice == "result-FV") {
      resultChoice = "FV"
      this.setData({
        HideParameter4: false,
        FVBack: "#FFFFFF",
        FVColor: "#73689B",
        PPBack: "",
        PPColor: "#FFFFFF",
        NPBack: "",
        NPColor: "#FFFFFF",
        resultText: "Future Value",
        Parameter1: this.data.calcList[0].parameter[0],
        Parameter2: this.data.calcList[0].parameter[1],
        Parameter4: this.data.calcList[0].parameter[2],
        Parameter5: this.data.calcList[0].parameter[3]
      })
    } else if (choice == "result-PP") {
      resultChoice = "PP";
      this.setData({
        HideParameter4: false,
        FVBack: "",
        FVColor: "#FFFFFF",
        PPBack: "#FFFFFF",
        PPColor: "#73689B",
        NPBack: "",
        NPColor: "#FFFFFF",
        resultText: "Periodic Payment",
        Parameter1: this.data.calcList[1].parameter[0],
        Parameter2: this.data.calcList[1].parameter[1],
        Parameter4: this.data.calcList[1].parameter[2],
        Parameter5: this.data.calcList[1].parameter[3]
      })
    } else if (choice == "result-NP") {
      resultChoice = "NP"
      this.setData({
        HideParameter4: true,
        FVBack: "",
        FVColor: "#FFFFFF",
        PPBack: "",
        PPColor: "#FFFFFF",
        NPBack: "#FFFFFF",
        NPColor: "#73689B",
        resultText: "Number of Periods",
        Parameter1: this.data.calcList[2].parameter[0],
        Parameter2: this.data.calcList[2].parameter[1],
        Parameter4: this.data.calcList[2].parameter[2],
        Parameter5: this.data.calcList[2].parameter[3]
      })
    }
  },

  Parameter1Input: function(e){
    Principle = e.detail.value
  },

  Parameter2Input: function(e){
    InterestRate = e.detail.value / 100
  },

  Parameter3Input: function(e){
    PeriodsperYear= e.detail.value
  },
  
  Parameter4Input: function(e){
    if (resultChoice == "FV" || resultChoice == "NP"){
      PeriodicPayment = e.detail.value
    } else if (resultChoice == "PP"){
      FutureValue = e.detail.value
    }
  },

  Parameter5Input: function(e){
    if (resultChoice == "FV" || resultChoice == "PP"){
      NumberofPeriods = e.detail.value
    } else if (resultChoice == "NP"){
      FutureValue = e.detail.value
    }
  },

  inputBlur: function(){
    if (resultChoice != "" && annuityChoice != ""){
      this.calcFunction()
    }
  },

  /*
  FV
  PMT = (P / (((Math.pow((1 + R), (N)) - 1)) / (R)))
  P = PMT * (((Math.pow((1 + R), (N)) - 1)) / (R))
  N = (Math.log(1 + ((P * R) / (PMT)))) / (Math.log(1 + R))
  */

  calcFunction: function(){
    var P = Principle
    var R = InterestRate / PeriodsperYear
    var PMT = PeriodicPayment
    var N = NumberofPeriods
    var FV = FutureValue
    if (annuityChoice == "OA"){
      if (resultChoice == "FV"){
        if (InterestRate > 0){
          FV = PMT * (((Math.pow((1 + R), (N)) - 1)) / (R)) + P * Math.pow((1 + R), N)
          this.setData({
            resultData: FV.toFixed(4)
          })
        } else if (InterestRate <= 0){
          FV = PMT * N + P
          this.setData({
            resultData: FV.toFixed(4)
          })
        }
      } else if (resultChoice == "PP"){
        if (InterestRate > 0){
          PMT = (FV - P * Math.pow((1 + R), N)) / (((Math.pow((1 + R), (N)) - 1)) / (R))
          this.setData({
            resultData: PMT.toFixed(4)
          })
        } else if (InterestRate <= 0){
          PMT = (FV - P) / N
          this.setData({
            resultData: PMT.toFixed(4)
          })
        }
      } else if (resultChoice == "NP"){
        if (InterestRate > 0) {
          N = (Math.log(FV / P)) / (Math.log(1 + R))
          this.setData({
            resultData: N.toFixed(4)
          })  
        } else{
          this.setData({
            resultData: "0.0000"
          })
        }
      }
    } else if (annuityChoice == "AD"){
      if (resultChoice == "FV") {
        if (InterestRate > 0) {
          FV = PMT * (((Math.pow((1 + R), (N)) - 1)) / (R)) * (1 + R) + P * Math.pow((1 + R), N)
          this.setData({
            resultData: FV.toFixed(4)
          })
        } else if (InterestRate <= 0){
          FV = PMT * N + P
          this.setData({
            resultData: FV.toFixed(4)
          })
        }
      } else if (resultChoice == "PP"){
        if (InterestRate > 0) {
          PMT = (FV - P * Math.pow((1 + R), N)) / ((((Math.pow((1 + R), (N)) - 1)) / (R)) * (1 + R))
          this.setData({
            resultData: PMT.toFixed(4)
          })
        } else if (InterestRate <= 0){
          PMT = (FV - P) / N
          this.setData({
            resultData: PMT.toFixed(4)
          })
        }
      } else if (resultChoice == "NP"){
        if (InterestRate > 0) {
          N = (Math.log(FV / P)) / (R)
          this.setData({
            resultData: N.toFixed(4)
          })
        } else {
          this.setData({
            resultData: "0.0000"
          })
        }
      }
    }
  },

  resetBtnClick: function () {
    resultChoice = ""
    annuityChoice = ""
    FutureValue = 0
    Principle = 0
    InterestRate = 0
    PeriodicPayment = 0
    NumberofPeriods = 0
    PeriodsperYear = 0
    this.setData({
      resultData: "0.0000",
      resultText: "Result",
      Parameter1: "Parameter",
      Parameter2: "Parameter",
      Parameter3: "Parameter",
      Parameter4: "Parameter",
      HideParameter4: false,
      Parameter5: "Parameter",
      FVBack: "",
      FVColor: "#FFFFFF",
      PPBack: "",
      PPColor: "#FFFFFF",
      NPBack: "",
      NPColor: "#FFFFFF",
      OABack: "",
      OAColor: "#FFFFFF",
      ADBack: "",
      ADColor: "#FFFFFF",
      PValue: ""
    })
  },


})