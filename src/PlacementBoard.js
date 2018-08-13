import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

/* 
A1 A2 A3
B1 B2 B3
C1 C2 C3
need array of positions where ship is
on square hover, initialize the positions array to the position of the hovered square
if orientation is horizontal, add remaining square positions to positions array by incrementing column number
if orientation is vertical, add remaining square positions to positions array by incrementing row letter
*/

const shipSizes = Object.freeze({
  carrier: 5,
  battleship: 5,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
});

export default class PlacementBoard extends Component {
  constructor() {
    super();
    this.state = {
      shipPositions: {
        carrier: [],
        battleship: [],
        cruiser: [],
        submarine: [],
        destroyer: []
      },
      currentShip: 'carrier',
      hovering: []
    };
    this.toggleSquareHover = this.toggleSquareHover.bind(this);
    this.getShipPositions = this.getShipPositions.bind(this);
    this.setShipPositions = this.setShipPositions.bind(this);
  }

  toggleSquareHover(e) {
    let hovering;
    if (e.type === 'mouseleave') hovering = [];
    if (e.type === 'mouseenter') hovering = this.getShipPositions('carrier', e.target.dataset.position, 'vertical');
    this.setState({
      hovering: hovering
    });
  }

  getShipPositions(ship, startingPosition, direction) {
    const shipSize = shipSizes[ship];
    const positions = [startingPosition];
    let [row, column] = [startingPosition[0], Number(startingPosition.slice(1))];
    for (let i = 1; i < shipSize; i++) {
      if (direction === 'horizontal') column += 1;
      if (direction === 'vertical') row = String.fromCharCode(row.charCodeAt() + 1);
      if (row.charCodeAt() > 74 || column > 10) {
        positions.push(null);
      } else {
        positions.push(row+column);
      }
    }
    return positions;
  }

  setShipPositions() {
    if (!this.state.hovering.every(e => e)) return;
    this.setState(prevState => {
      prevState.shipPositions[prevState.currentShip] = prevState.hovering;
      return {
        shipPositions: prevState.shipPositions,
        // currentShip: '',
        hovering: []
      };
    });
  }

  render() {
    // fill squares array with 100 Square components, each with its own position 'A1'-'J10'
    const squares = [];
    for(let i = 0; i < 100; i++) {
      let squarePosition = positionFromIndex(i);
      let color;
      if (this.state.hovering.includes(squarePosition)) {
        color = this.state.hovering.every(e => e) ? 'lightyellow' : 'lightpink';
      } else {
        color = 'lightblue';
      }
      let squareStyle = {backgroundColor: color};
      squares.push(
        <Square key={squarePosition} 
          style={squareStyle} 
          data-position={squarePosition} 
          onMouseEnter={this.toggleSquareHover} 
          onMouseLeave={this.toggleSquareHover} 
          onClick={this.setShipPositions}/>
      );
    }

    return (
      <Board>
        {squares}
      </Board>
    );
  }
}