import React, { Component } from 'react';
import _ from 'lodash';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';
import ShipSelectors from './ShipSelectors';

// REACT COMPONENT
export default class HomeBoard extends Component {
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
      currentShip: '',
      currentDirection: '',
      hovering: []
    };
    this.toggleSquareHover = this.toggleSquareHover.bind(this);
    this.getHoveringPositions = this.getHoveringPositions.bind(this);
    this.saveCurrentShipPositions = this.saveCurrentShipPositions.bind(this);
    this.setCurrentShip = this.setCurrentShip.bind(this);
    this.setCurrentDirection = this.setCurrentDirection.bind(this);
  }

  getHoveringPositions(startPosition) {
    const s = this.state;
    if (!s.currentShip || !s.currentDirection) return [];
    const currentShipSize = shipSizes[s.currentShip];
    const positions = nullArray(currentShipSize).map(addPositions(startPosition, s.currentDirection));
    const nonCurrentShipPositions = _.flatten(_.values(_.omit(s.shipPositions, s.currentShip)));

    return positions.map(flagIfOverlapping(nonCurrentShipPositions));
  }

  toggleSquareHover(e) {
    let hovering;
    if (e.type === 'mouseleave') hovering = [];
    if (e.type === 'mouseenter') hovering = this.getHoveringPositions(e.target.dataset.position);
    
    this.setState({
      hovering: hovering
    });
  }

  saveCurrentShipPositions() {
    if(invalidHoveringPosition(this.state.hovering)) return;

    this.setState(p => { // p is prevState
      p.shipPositions[p.currentShip] = p.hovering;
      return {
        shipPositions: p.shipPositions,
        hovering: []
      };
    });
  }

  setCurrentShip(newShip) {
    this.setState({
      currentShip: newShip
    });
  }

  setCurrentDirection(newDirection) {
    this.setState({
      currentDirection: newDirection
    });
  }

  render() {
    // fill squares array with 100 Square components, each with its own position 'A1'-'J10'
    const squares = [];
    const shipPositionsFlatArray = _.flatten(_.values(this.state.shipPositions));
    const hoveringPositions = this.state.hovering;
    const hoveringOffBoard = !hoveringPositions.every(position => position); // true if any hovering positions are null
    for(let i = 0; i < 100; i++) {
      const squarePosition = positionFromIndex(i); // convert the index to the appropriate board position, ie: 0 -> 'A1', 99 -> 'J10'
      
      let color = 'lightblue'; // default square color

      // squares with ships in them should be green
      if (shipPositionsFlatArray.includes(squarePosition)) color = 'lightgreen';

      // if a ship is hovering over a square, color it yellow, or pink if the hovering ship is not entirely on the board
      if (hoveringPositions.includes(squarePosition)) color = hoveringOffBoard ? 'lightpink' : 'lightyellow';

      // color the square pink if it includes both a placed ship and a hovering ship (placement conflict)
      if (hoveringPositions.includes('!' + squarePosition)) color = 'lightpink';
      
      let squareStyle = {backgroundColor: color};
      
      squares.push(
        <Square key={squarePosition} 
          style={squareStyle} 
          data-position={squarePosition} 
          onMouseEnter={this.toggleSquareHover} 
          onMouseLeave={this.toggleSquareHover} 
          onClick={this.saveCurrentShipPositions}/>
      );
    } // end for loop

    const gridPosition = "grid-area: 1 / 1 / span 1 / span 1;"; // board position within the GameBoard grid

    return (
      <div>
        <Board size="300px" gridPosition={gridPosition}>
          {squares}
        </Board>
        {/* <ShipSelectors 
        currentShip={this.state.currentShip}
        currentDirection={this.state.currentDirection}
        changeShip={this.setCurrentShip}
        changeDirection={this.setCurrentDirection} /> */}
      </div>
    );
  }
}

// GLOBAL VARIABLES & FUNCTIONS
const shipSizes = Object.freeze({
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
});

// nullArray -> returns an array of size 'size' filled with 'null'
const nullArray = size => Array(size).fill(null);


// nextRow -> takes a character and returns the character resulting from that character's charCode incremented by the provided amount
const nextRow = (letter, increment) => String.fromCharCode(letter.charCodeAt() + increment);


// addPositions -> a closure which establishes a context with the starting rowstarting column,
// and then returns one of two functions which will increment either the row letter or column number
// based on the provided direction, or "null" if the resulting position would be off the board. 
// (meaning the column is greater than 10, or the row is greater than 'J')
// Example: ('A1', 'horizontal') => 'A2'; ('B3', 'vertical') => 'C3'; ('A10', 'horizontal') => 'null' ('A11')
const addPositions = (start, direction) => {
  const [rowStart, colStart] = [start[0], Number(start.slice(1))];
  const addingFunctions = {
    horizontal: (element, index) => colStart+index > 10 ? null : rowStart + (colStart+index),
    vertical: (element, index) => nextRow(rowStart, index) > 'J' ? null : nextRow(rowStart, index) + colStart
  }
  return addingFunctions[direction];
};

// mapping function for flagging an element of 'positions' with a '!' if it is the same as 'position'
// this is used to check if any hovering positions overlap with a currently placed ship
const flagIfOverlapping = positions => position => positions.includes(position) ? '!'+position : position;

const isInvalid = position => position === null || position.includes('!');

const invalidHoveringPosition = positions => !positions.length || _.some(positions, isInvalid);
