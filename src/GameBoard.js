import React, { Component } from 'react';
import Board, { boardRows, boardColumns } from './Board';
import { Square } from './BoardStyles';

export default class GameBoard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			shots: []
    };
    this.shoot = this.shoot.bind(this);
	} // end constructor
  
  // if a ship is located at a certain position, return the ship name,
  // otherwise, return null
	shipAtPosition(position) {
		let shipPositions = Object.entries(this.props.playerPositions);
		for (let ship of shipPositions) if (ship[1].includes(position)) return ship[0];
		return null;
	} // end shipAtPosition

	shoot(position) {
		if (this.state.shots.includes(position)) return;
		
		this.setState(prevState => ({shots: [...prevState.shots, position]}));
		
		let ship = this.shipAtPosition(position);
		this.props[ship ? 'onHit' : 'onMiss'](this.props.playerName, ship);
  } // end shoot
  
  render() {
    // uses the boardColumns array [1-10] and boardRows [A-J]
    // to create one flat array of Square components with positions
    // A1, A2, A3, etc.
    // This array is filled into the board grid from left to right, top to bottom.
    const squaresArray = boardColumns.reduce((array, columnNumber) => 
      array.concat(
        boardRows.map(rowLetter => {
          let position = rowLetter+columnNumber;
          return (
            <Square key={position} onClick={() => this.shoot(position)}>
              {this.state.shots.includes(position) ?
                this.shipAtPosition(position) ? 'X' : 'O'
                : ''}
            </Square>
          );
        })
      ),
    []);
    return (
      <Board>
        {squaresArray}
      </Board>
    );
  }
}
