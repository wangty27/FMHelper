// pages/academicMortcal/academicMortcal.js

var resultChoice = ""
var annuityChoice = ""
var Ppass = 0
var Rpass = 0
var PMTpass = 0
var Npass = 0

Page({
  data: {
    resultData: "0.0000",
    resultText: "Result",
    Parameter1: "Parameter",
    Parameter2: "Parameter",
    Parameter3: "Parameter",
    Principle: 0,
    MonthlyPayment: 0,
    NumberofMonths: 0,
    InterestRate: 0,
    PrincipleP: "0.0000",
    InterestP: "0.0000",
    MonthNumber: 0,
    calcList: [
      {
        target: "MP",
        parameter: ["Principle", "Interest Rate(%)", "Number of Months"]
      },
      {
        target: "P",
        parameter: ["Monthly Payment", "Interest Rate(%)", "Number of Months"]
      },
      {
        target: "NM",
        parameter: ["Principle", "Interest Rate(%)", "Monthly Payment"]
      },
      {
        target: "IR",
        parameter: ["Principle", "Monthly Payment", "Number of Months"]
      }
    ]
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
      Principle: 0,
      MonthlyPayment: 0,
      NumberofMonths: 0,
      InterestRate: 0
    })
    if (choice == "result-MP") {
      resultChoice = "MP"
      this.setData({
        MPBack: "#FFFFFF",
        MPColor: "#73689B",
        PBack: "",
        PColor: "#FFFFFF",
        NMBack: "",
        NMColor: "#FFFFFF",
        resultText: "Monthly Payment",
        Parameter1: this.data.calcList[0].parameter[0],
        Parameter2: this.data.calcList[0].parameter[1],
        Parameter3: this.data.calcList[0].parameter[2]
      })
    } else if (choice == "result-P") {
      resultChoice = "P";
      this.setData({
        MPBack: "",
        MPColor: "#FFFFFF",
        PBack: "#FFFFFF",
        PColor: "#73689B",
        NMBack: "",
        NMColor: "#FFFFFF",
        resultText: "Principle",
        Parameter1: this.data.calcList[1].parameter[0],
        Parameter2: this.data.calcList[1].parameter[1],
        Parameter3: this.data.calcList[1].parameter[2]
      })
    } else if (choice == "result-NM") {
      resultChoice = "NM"
      this.setData({
        MPBack: "",
        MPColor: "#FFFFFF",
        PBack: "",
        PColor: "#FFFFFF",
        NMBack: "#FFFFFF",
        NMColor: "#73689B",
        resultText: "Number of Months",
        Parameter1: this.data.calcList[2].parameter[0],
        Parameter2: this.data.calcList[2].parameter[1],
        Parameter3: this.data.calcList[2].parameter[2]
      })
    }
    this.resetBtn2Click()
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
    this.subcalcFunction()
  },

  resetBtn1Click: function () {
    resultChoice = ""
    annuityChoice = ""
    Ppass = 0
    Rpass = 0
    PMTpass = 0
    Npass = 0
    this.setData({
      resultData: "0.0000",
      resultText: "Result",
      Parameter1: "Parameter",
      Parameter2: "Parameter",
      Parameter3: "Parameter",
      MPBack: "",
      MPColor: "#FFFFFF",
      PBack: "",
      PColor: "#FFFFFF",
      NMBack: "",
      NMColor: "#FFFFFF",
      OABack: "",
      OAColor: "#FFFFFF",
      ADBack: "",
      ADColor: "#FFFFFF",
      PValue: "",
      Principle: 0,
      MonthlyPayment: 0,
      NumberofMonths: 0,
      InterestRate: 0,
    })
    this.resetBtn2Click()
  },

  inputFunction: function(e){
    var id = e.target.id
    if (id == "Parameter1"){
      if (resultChoice == "MP" || resultChoice == "NM"){
        this.data.Principle = e.detail.value
      }
      else if (resultChoice == "P"){
        this.data.MonthlyPayment = e.detail.value
      }
    } else if (id == "Parameter2"){
      this.data.InterestRate = e.detail.value / 100
    } else if (id == "Parameter3"){
      if (resultChoice == "MP" || resultChoice == "P"){
        this.data.NumberofMonths = e.detail.value
      }
      else if (resultChoice == "NM"){
        this.data.MonthlyPayment = e.detail.value
      }
    }
  },

  inputBlur: function() {
    if (resultChoice != "" && annuityChoice != "") {
      this.calcFunction()
      this.resetBtn2Click()
    }
  },

  /*
    PV OA
    PMT = (P / ((1 - (Math.pow((1 + R), (-N)))) / (R)))
    P = PMT * ((1 - (Math.pow((1 + R), (-N)))) / (R))
    N = -(Math.log(1 - (P * R) / (PMT))) / (Math.log(1 + R))
  */


  calcFunction: function () {
    var P = this.data.Principle
    var R = this.data.InterestRate / 12
    var N = this.data.NumberofMonths
    var PMT = this.data.MonthlyPayment
    if (annuityChoice == "OA") {
      if (resultChoice == "MP") {
        if (this.data.InterestRate > 0) {
          PMT = (P / ((1 - (Math.pow((1 + R), (-N)))) / (R)))
          this.setData({
            resultData: PMT.toFixed(4)
          })
        } else if (this.data.InterestRate <= 0) {
          PMT = P / N
          this.setData({
            resultData: PMT.toFixed(4)
          })
        }
      } else if (resultChoice == "P") {
        if (this.data.InterestRate > 0) {
          P = PMT * ((1 - (Math.pow((1 + R), (-N)))) / (R))
          this.setData({
            resultData: P.toFixed(4)
          })
        }
        else if (this.data.InterestRate <= 0) {
          P = PMT * N
          this.setData({
            resultData: P.toFixed(4)
          })
        }
      } else if (resultChoice == "NM") {
        if (this.data.InterestRate > 0) {
          N = -(Math.log(1 - (P * R) / (PMT))) / (Math.log(1 + R))
          this.setData({
            resultData: N.toFixed(4)
          })
        }
        else if (this.data.InterestRate <= 0) {
          N = P / PMT
          this.setData({
            resultData: N.toFixed(4)
          })
        }
      }
    } else if (annuityChoice == "AD") {
      if (resultChoice == "MP") {
        if (this.data.InterestRate > 0) {
          PMT = (P / (((1 - (Math.pow((1 + R), (-N)))) / (R)) * (1 + R)))
          this.setData({
            resultData: PMT.toFixed(4)
          })
        }
        else if (this.data.InterestRate <= 0) {
          PMT = P / N
          this.setData({
            resultData: PMT.toFixed(4)
          })
        }
      } else if (resultChoice == "P") {
        if (this.data.InterestRate > 0) {
          P = PMT * ((1 - (Math.pow((1 + R), (-N)))) / (R)) * (1 + R)
          this.setData({
            resultData: P.toFixed(4)
          })
        }
        else if (this.data.InterestRate <= 0) {
          P = PMT * N
          this.setData({
            resultData: P.toFixed(4)
          })
        }
      } else if (resultChoice == "NM") {
        if (this.data.InterestRate > 0) {
          N = -(Math.log(1 - (P * R) / (PMT * (1 + R)))) / (Math.log(1 + R))
          this.setData({
            resultData: N.toFixed(4)
          })
        }
        else if (this.data.InterestRate <= 0) {
          N = P / PMT
          this.setData({
            resultData: N.toFixed(4)
          })
        }
      }
    }
    Ppass = P
    Rpass = R
    Npass = N
    PMTpass = PMT
  },

  SubInput: function (e) {
    if (Npass == 0){
      wx.showModal({
        title: 'Error',
        content: 'Please finish main calculation first',
        showCancel: false
      })
      wx.hideKeyboard()
      this.setData({
        SubInputValue: "",
      })
    } else{
      this.data.MonthNumber = e.detail.value
    }
  },

  subcalcFunction: function() {
    var Nth = this.data.MonthNumber
    var PMT = PMTpass
    var P = Ppass
    var R = Rpass
    var N = Npass
    var newN = N - Nth
    if (this.data.resultData > 0) {
      var PP = 0
      var IP = 0
      if (newN < 0) {
        wx.showModal({
          title: 'Error',
          content: 'Please enter a correct month number',
          showCancel: false
        })
        wx.hideKeyboard()
        this.setData({
          SubInputValue: "",
        })
        PP = 0
        IP = 0
        this.resetBtn2Click()
      }
      else if (this.data.InterestRate <= 0) {
        PP = PMT * Nth
        IP = 0
      }
      else if (Nth == 0)
      {
        PP = 0
        IP = 0
      }
      else if (annuityChoice == "OA") {
        PP = P - (PMT * ((1 - (Math.pow((1 + R), (-newN)))) / (R)))
        IP = (PMT * this.data.MonthNumber) - PP
      }
      else if (annuityChoice == "AD") {
        PP = P - (PMT * ((1 - (Math.pow((1 + R), (-newN)))) / (R)) * (1 + R))
        IP = (PMT * this.data.MonthNumber) - PP
      }
      this.setData({
        PrincipleP: PP.toFixed(4),
        InterestP: IP.toFixed(4)
      })
    }
  },

  subinputBlur: function() {
    if (resultChoice != "" && annuityChoice != ""){
      this.subcalcFunction()
    }
  },

  resetBtn2Click: function() {
    this.setData({
      MonthNumber: 0,
      PrincipleP: "0.0000",
      InterestP: "0.0000",
      SubInputValue: ""
    })
  }
})