import React, { Component } from 'react';
import { BoardGrid, ColumnLabels, RowLabels, Square } from './BoardStyles';

export const boardRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const boardColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default class Board extends Component {
	render() {
		return (
			<BoardGrid>
				<div></div>
				<ColumnLabels>{boardColumns.map(number => <Square key={number}>{number}</Square>)}</ColumnLabels>
				<RowLabels>{boardRows.map(letter => <Square key={letter}>{letter}</Square>)}</RowLabels>
				{this.props.children}
			</BoardGrid>
		);
	} // end render
} // end Board

