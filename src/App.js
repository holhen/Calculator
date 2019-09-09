import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { Input } from'./components/Input'
import { ClearButton } from './components/ClearButton'
import { string, round, evaluate } from 'mathjs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      input: '0'
    }
    
    this.addToInput = this.addToInput.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const regex = /[0-9+*\-/.]/;
      if(key.match(regex)){
        this.addToInput(key);
      }
      else if(key === "Enter"){
        this.handleEqual();
      }
      else if(key === "Escape") {
        this.setState({
          input: '0'
        })
      }
    })
  }

  addToInput(val) {
    if(val === "."){
      const numbers = this.state.input.split(/[+*\-/]/);
      if(numbers[numbers.length-1].indexOf(".") > -1)
        return;
    }
    const operators = /[+*\-/]$/;
    const currentState = this.state.input
    if (val.match(operators) && currentState[currentState.length-1].match(operators)){
      this.setState({input: this.state.input.replace(operators, val)}); 
    }
    else if(this.state.input === "0"){
      this.setState({input: val});
    }
    else {
      this.setState({input: this.state.input + val});
    }
  }

  handleEqual() {
    if (isNaN(this.state.input[this.state.input.length-1])) {
      this.setState({input: this.state.input});     
      }
      else {
      this.setState({input: string(round(evaluate(this.state.input),10))});
      }
  }

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} id="display"></Input>
          <div className="row">
            <Button handleClick={this.addToInput} id="seven">7</Button>
            <Button handleClick={this.addToInput} id="eight">8</Button>
            <Button handleClick={this.addToInput} id="nine">9</Button>
            <Button handleClick={this.addToInput} id="divide">/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput} id="four">4</Button>
            <Button handleClick={this.addToInput} id="five">5</Button>
            <Button handleClick={this.addToInput} id="six">6</Button>
            <Button handleClick={this.addToInput} id="multiply">*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput} id="one">1</Button>
            <Button handleClick={this.addToInput} id="two">2</Button>
            <Button handleClick={this.addToInput} id="three">3</Button>
            <Button handleClick={this.addToInput} id="add">+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput} id="decimal">.</Button>
            <Button handleClick={this.addToInput} id="zero">0</Button>
            <Button handleClick={() => this.handleEqual()} id="equals">=</Button>
            <Button handleClick={this.addToInput} id="subtract">-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({input: '0'})} id="clear">Clear</ClearButton>
          </div>
        </div>
      </div>
    )}
}

export default App;
