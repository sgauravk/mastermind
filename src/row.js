import React from 'react';
import './row.css';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.colors = props.colors;
    this.pattern = props.pattern;
    this.fnRef = props.fnRef;
    this.id = props.id;
    this.createColorDiv.bind(this);
  }

  createColorDiv(color) {
    return <div className={this.id} style={{background: color}} id={this.id} onClick={this.fnRef}/>
  }

  render() {
    return this.colors.map(color => this.createColorDiv(color));
  }
}

export default Row;
