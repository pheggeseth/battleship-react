import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

export default class AttackBoard extends Component {
  // constructor(props) {
	// 	super(props);
	// 	// this.state = {
	// 	// 	shots: []
  //   // };
  //   // this.shoot = this.shoot.bind(this);
	// } // end constructor
  
  // if a ship is located at a certain position, return the ship name,
  // otherwise, return null
	shipAtPosition(position) {
		let shipPositions = Object.entries(this.props.playerPositions);
		for (let ship of shipPositions) if (ship[1].includes(position)) return ship[0];
		return null;
	} // end shipAtPosition

	// shoot(position) {
	// 	if (this.state.shots.includes(position)) return;
		
	// 	this.setState(prevState => ({shots: [...prevState.shots, position]}));
		
	// 	let ship = this.shipAtPosition(position);
	// 	this.props[ship ? 'onHit' : 'onMiss'](this.props.playerName, ship);
  // } // end shoot

  handleClick(position) {
    this.props.onClick(position);
  }
  
  render() {
    // fill squares array with 100 Square components, each with its own position 'A1'-'J10'
    const squares = [];
    for(let i = 0; i < 100; i++) {
      let position = positionFromIndex(i);
      let squareContent = '';
      for (let shot of this.props.shots) {
        if (shot.position === position) {
          squareContent = shot.hit ? 'X' : 'O';
          break;
        }
      }
      squares.push(
        <Square key={position} onClick={() => this.handleClick(position)}>
          {/* {this.state.shots.includes(position) ?
            this.shipAtPosition(position) ? 'X' : 'O'
            : ''} */}
          {squareContent}
        </Square>
      );
    }

    return <Board size="400px" gridPosition="grid-area: 2 / 2 / span 1 / span 1;">{squares}</Board>;
  }
}
