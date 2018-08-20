import React, { Component } from 'react';
import _ from 'lodash';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';
import PlacementSelectors from './PlacementSelectors';

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

// mapping function for flaggin an element of 'positions' with a '!' if it is the same as 'position'
// this is used to check if any hovering positions overlap with a currently placed ship
const flagIfOverlapping = positions => position => positions.includes(position) ? '!'+position : position;


// REACT COMPONENT
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
      currentShip: 'battleship',
      currentDirection: 'horizontal',
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
    if(!this.state.hovering.length) return; // if not hovering
    for (let position of this.state.hovering) {
      if (!position || position.includes('!')) return; // if any position is null or flagged as overlapping
    }

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
    for(let i = 0; i < 100; i++) {
      let squarePosition = positionFromIndex(i); // convert the index to the appropriate board position
      
      // refactor the color picking into separate functions
      let color = 'lightblue';
      for (let ship in this.state.shipPositions) {
        if (this.state.shipPositions[ship].includes(squarePosition)) {
          color = 'lightgreen';
          break;
        }
      }
      if (this.state.hovering.includes(squarePosition)){
        color = this.state.hovering.every(e => e) ? 'lightyellow' : 'lightpink';
      } 
      if (this.state.hovering.includes('!'+squarePosition)) color = 'lightpink';

      let squareStyle = {backgroundColor: color};
      
      squares.push(
        <Square key={squarePosition} 
          style={squareStyle} 
          data-position={squarePosition} 
          data-index={i}
          onMouseEnter={this.toggleSquareHover} 
          onMouseLeave={this.toggleSquareHover} 
          onClick={this.saveCurrentShipPositions}/>
      );
    } // end for loop

    return (
      <div>
        <Board>
          {squares}
        </Board>
        <PlacementSelectors 
        currentShip={this.state.currentShip}
        currentDirection={this.state.currentDirection}
        changeShip={this.setCurrentShip}
        changeDirection={this.setCurrentDirection} />
      </div>
    );
  }
}