import React from 'react';
import './App.css';
import Row from './row'

const _ = require('lodash');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.generateOneRow.bind(this);
    this.allColors = ["white", "blue", "red", "green", "aqua", "blueviolet", "yellow", "deeppink"];
    this.pattern = _.take(_.shuffle(this.allColors), 5);
    this.emptyColor = new Array(5).fill("");
    this.currentRowCount = 1;
    this.selectedColor = "";
    this.allRows = new Array(12).fill(this.emptyColor);
  }

  validateRow() {
    const selectedColors = [];
    const currentRowCount = 12 - this.currentRowCount++;
    const currentRow = _.nth(document.getElementById("allRows").childNodes, currentRowCount);
    let selectedColorsElements = currentRow.querySelectorAll("#color");
    selectedColorsElements.forEach(x => selectedColors.push(x.style.background));
    const resultSection = currentRow.querySelectorAll("#resultSection");
    const {correctColor, correctPosition} = this.calculateResult(selectedColors);
    _.range(0, correctPosition).forEach(i => resultSection[i].style.background = "darkorange");
    _.range(correctPosition, correctColor + correctPosition).forEach(i => resultSection[i].style.background = "aqua");
    this.disableAllRowsClick();
    if (this.isGameOver(correctPosition)) return;
    this.enableCurrentRowsClick();
  }

  isGameOver(correctPositions) {
    const palletColor = document.querySelector(".pallet").childNodes;
    if (correctPositions === this.pattern.length) {
      const msg = "YOU WON ".split("");
      palletColor.forEach((c, i) => c.innerText = msg[i]);
      return true;
    }
    if (this.currentRowCount > 12) {
      const msg = "GAMEOVER".split("");
      palletColor.forEach((c, i) => c.innerText = msg[i]);
      return true;
    }
    return false;
  }

  calculateResult(userSelection) {
    let correctColor = 0;
    let correctPosition = 0;
    for (let i = 0; i < userSelection.length; i++) {
      if (userSelection[i] === this.pattern[i]) {
        correctPosition++;
        continue;
      }
      this.pattern.includes(userSelection[i]) && correctColor++;
    }
    return {correctColor, correctPosition};
  }

  disableAllRowsClick() {
    const allRows = document.getElementById("allRows").childNodes;
    allRows.forEach(row => {
      row.style.background = "inherit";
      row.childNodes.forEach(element => element.onclick = null)
    });
  }

  createCheckButton() {
    return <button>check</button>
  }

  generateOneRow(colors) {
    return <div className="row">
      <Row colors={colors} id="color"/>
      {this.createCheckButton()}
      <Row colors={colors} id="resultSection"/>
    </div>
  }

  selectColor(event) {
    document.querySelectorAll(".color").forEach(x => x.style.border = "0");
    this.selectedColor = event.target.style.background;
    event.target.style.border = "1px solid white";
  }

  enableCurrentRowsClick() {
    const currentRowCount = 12 - this.currentRowCount;
    const currentRow = _.nth(document.getElementById("allRows").childNodes, currentRowCount);
    currentRow.style.background = "#001b1bd9";
    const colorsElement = currentRow.querySelectorAll("#color");
    currentRow.querySelector("button").onclick = this.validateRow.bind(this);
    colorsElement.forEach(x => x.onclick = () => x.style.background = this.selectedColor);
  }

  componentDidMount() {
    this.enableCurrentRowsClick();
  }

  render() {
    let allRows = this.allRows.map(row => this.generateOneRow(row));
    return <main>
      <div id="allRows" className="board">{allRows}</div>
      <div className="row pallet"><Row colors={this.allColors} fnRef={this.selectColor.bind(this)} id="color"/></div>
    </main>
  }
}

export default App;