import './App.css';
import React, { useState, useEffect } from 'react';
import './font/digital-7/digital-7.ttf';

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: "",
      output: "0",
      answer: "",
      display: "",
      nextInput: false, 
      limitReached: false
    }
    this.storeExpression = this.storeExpression.bind(this);
    this.clearExpression = this.clearExpression.bind(this);
    this.calculate = this.calculate.bind(this);

  }
  // Add a componentDidUpdate method to mimic the useEffect behavior
  componentDidUpdate() {
    if (this.state.limitReached) {
      setTimeout(() => {
        this.setState({ limitReached: false });
      }, 1000);
    }
  }


  storeExpression(e) {
    var expression = this.state.input.toString().concat(e.target.value)
    var output = ""
    var input = e.target.value;
    var lastTwo = expression.slice(-2)
    var limitReached = false
    if (this.state.nextInput == false) {
      //handle input
      //handle multiple decimal points
      if (expression.includes("..")) {
        expression = expression.replace("..", '.')
      }
      //handle number starts with zero
      else if (expression.length > 1 & expression[0] == 0 & expression[1] != '.') {
        expression = expression.replace(expression[0], '')
      }
      //handle expressions starting with multiplication and divide
      else if (expression[0] == '*' | expression[0] == "/") {
        expression = expression.replace(expression[0], '')
      }
      //handle digits starting with multiple zeros
      else if (expression === "00") {
        expression = "0"
      }
      else if (lastTwo == "+-" | lastTwo == "+*" | lastTwo == "+/" | lastTwo == "-+" | lastTwo == "-*" | lastTwo == "-/" | lastTwo == "*+" | lastTwo == "*/" | lastTwo == "/+" | lastTwo == "/*" | lastTwo == "++" | lastTwo == "--" | lastTwo == "**" | lastTwo == "//") {
        expression = expression.replace(lastTwo, lastTwo[1])
      }
      

      //handle output
      //handle when an operation is clicked
      if (input == "+" | input == "-" | input == "*" | input == "/") {
        output = input
      }
      else {
        output = this.state.output.concat(e.target.value)
        //to handle for expresssions starting with 0 and operations
        if (output[0] == "+" | output[0] == "-" | output[0] == "*" | output[0] == "/") {
          output = output.replace(output[0], '')
        }
        else if (output.length > 1 & output[0] == 0 & output[1] != '.') {
          output = output.replace(output[0], '')
        }
        else if (output.includes("..")) {
          output = output.replace("..", '.')
        }
        else if (output.length > 15) {
          limitReached = true
          output = output.slice(0, 15)

        }
      }
    }

    else {
      //to handle next expression that starts with operation. it will continue the operation using the answer from the prev operation
      if (lastTwo[1] == "+" | lastTwo[1] == "-" | lastTwo[1] == "*" | lastTwo[1] == "/") {
        var expression = this.state.answer.toString().concat(e.target.value)
        output = e.target.value
      } else {
        output = "0"
        expression = e.target.value
      }
    }

    this.setState({
      input: expression,
      output,
      nextInput: false,
      limitReached
    })
  }

  clearExpression() {
    this.setState({
      input: '',
      output: '0'
    })
  }
  calculate() {

    var expression = this.state.input;
    if (this.state.nextInput == false) {
      var lastTwoChar = expression.slice(-2)
      var lastchar = expression.slice(-1)
      if (lastTwoChar == "*-" | lastTwoChar == "/-" | lastTwoChar == "+-" | lastTwoChar == "--") {
        expression = expression.slice(0, -2)
      }
      else if (lastchar == "+" | lastchar == "-" | lastchar == "*" | lastchar == "/") {
        expression = expression.slice(0, -1)
      }
      var answer = eval(expression);
      var input = expression.concat("=", answer)
      if (answer.length>15) {
        answer=answer.splice(0, 15)
      }
      this.setState({
        input,
        output: answer,
        answer,
        nextInput: true
      })
    }

  }

  render() {

    return (
      <div className="app" >
        <div className="container">
          <section className="result">
            <div className="output expression">{this.state.input}</div>
            <div className="output answer" id="display"> {this.state.limitReached ? "DIGIT LIMIT MET" : this.state.output}</div>
          </section>
          <section className="digits">
            <button className="button ac red" onClick={this.clearExpression} id="clear">AC</button>
            <button className="button operator" onClick={this.storeExpression} value="/" id="divide">/</button>
            <button className="button operator" onClick={this.storeExpression} value="*" id="multiply">x</button>
            <button className="button number" onClick={this.storeExpression} value="7" id="seven">7</button>
            <button className="button number" onClick={this.storeExpression} value="8" id="eight">8</button>
            <button className="button number" onClick={this.storeExpression} value="9" id="nine">9</button>
            <button className="button operator" onClick={this.storeExpression} value="-" id="substract">-</button>
            <button className="button number" onClick={this.storeExpression} value="4" id="four">4</button>
            <button className="button number" onClick={this.storeExpression} value="5" id="five">5</button>
            <button className="button number" onClick={this.storeExpression} value="6" id="six">6</button>
            <button className="button operator" onClick={this.storeExpression} value="+" id="plus">+</button>
            <button className="button number" onClick={this.storeExpression} value="1" id="one">1</button>
            <button className="button number" onClick={this.storeExpression} value="2" id="two">2</button>
            <button className="button number" onClick={this.storeExpression} value="3" id="three">3</button>
            <button className="button equals" onClick={this.calculate} value="=" id="equals">=</button>
            <button className="button number ac" onClick={this.storeExpression} value="0" id="zero">0</button>
            <button className="button number" onClick={this.storeExpression} value="." id="decimal">.</button>
          </section>
        </div>
      </div>
    )
  }
}


export default Calculator;
