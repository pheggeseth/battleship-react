import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

export default class AttackBoard extends Component {
  
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
          {squareContent}
        </Square>
      );
    }

    return <Board size="400px" gridPosition="grid-area: 2 / 2 / span 1 / span 1;">{squares}</Board>;
  }
}
