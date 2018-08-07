import React, { Component } from 'react';
import { StyledBoard, ColumnLabels, RowLabels, Square } from './BoardStyles';

const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const rowNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shots: []
		};
	} // end constructor
	
	shipAtPosition(position) {
		let shipPositions = Object.entries(this.props.positions);
		for (let ship of shipPositions) if (ship[1].includes(position)) return ship[0];
		return null;
	} // end shipAtPosition

	shoot(position) {
		if (this.state.shots.includes(position)) return;
		
		this.setState(prevState => ({shots: [...prevState.shots, position]}));
		
		let ship = this.shipAtPosition(position);
		this.props[ship ? 'onHit' : 'onMiss'](this.props.player, ship);
	} // end shoot
	
	render() {
		const squares = rowNumbers.reduce((array, row) => 
			array.concat(columnLetters.map(col => 
				<Square key={col+row} onClick={() => this.shoot(col+row)}>
					{this.state.shots.includes(col+row) ?
						this.shipAtPosition(col+row) ? 'X' : 'O'
						: ''}
				</Square>
			)), []
		);
		
		return (
			<StyledBoard>
				<div></div>
				<ColumnLabels>{columnLetters.map(letter => <Square key={letter}>{letter}</Square>)}</ColumnLabels>
				<RowLabels>{rowNumbers.map(number => <Square key={number}>{number}</Square>)}</RowLabels>
				{squares}
			</StyledBoard>
		);
	} // end render
} // end Board

export default Board;
