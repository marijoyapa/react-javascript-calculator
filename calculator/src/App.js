import logo from './logo.svg';
import './App.css';
import React from 'react'

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expression: "",
      answer: ""
    }
    this.storeExpression = this.storeExpression.bind(this);
    this.clearExpression = this.clearExpression.bind(this)

  }

  storeExpression(e){
    this.setState({
      expression: this.state.expression.concat(e.target.value)
    })
  }
  clearExpression(){
    this.setState({
      expression: ''
    })
  }

  render() {

    return (
      <div className="app" >
        <div className="container">
          <section className="result">
            <div> number </div>
            <div>{this.state.expression}</div>
          </section>
          <section className="digits">
            <button className="button ac" onClick={this.clearExpression}>AC</button>
            <button className="button operator" onClick={this.storeExpression} value="/">/</button>
            <button className="button operator" onClick={this.storeExpression} value="*">x</button>
            <button className="button number" onClick={this.storeExpression} value="7">7</button>
            <button className="button number" onClick={this.storeExpression} value="8">8</button>
            <button className="button number" onClick={this.storeExpression} value="9">9</button>
            <button className="button operator" onClick={this.storeExpression} value="-">-</button>
            <button className="button number" onClick={this.storeExpression} value="4">4</button>
            <button className="button number" onClick={this.storeExpression} value="5">5</button>
            <button className="button number" onClick={this.storeExpression} value="6">6</button>
            <button className="button operator" onClick={this.storeExpression} value="+">+</button>
            <button className="button number" onClick={this.storeExpression} value="1">1</button>
            <button className="button number" onClick={this.storeExpression} value="2">2</button>
            <button className="button number" onClick={this.storeExpression} value="3">3</button>
            <button className="button equals" onClick={this.storeExpression} value="=">=</button>
            <button className="button number ac" onClick={this.storeExpression} value="0">0</button>
            <button className="button number" onClick={this.storeExpression} value=".">.</button>
          </section>
        </div>
      </div>
    )
  }



}



export default Calculator;
