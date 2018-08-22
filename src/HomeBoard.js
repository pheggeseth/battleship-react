import React, { Component } from 'react';
import _ from 'lodash';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

export default class HomeBoard extends Component {
  render() {
    const squares = [];
    for (let i = 0; i < 100; i++) {
      let position = positionFromIndex(i);
      let style = getBackgroundColor(position, this.props.positions, this.props.shots);
      squares.push(
        <Square key={position} 
          style={style}/>
      );
    }
    
    return (
      <Board>
        {squares}
      </Board>
    );
  }
}

const getBackgroundColor = (squarePosition, shipPositions, shots) => {
  let color = 'powderblue';
  if (_.some(_.flatten(_.values(shipPositions)), position => position === squarePosition)) {
    color = 'lightgreen';
  }
  let shot = shots.find(shot => shot.position === squarePosition);
  if (shot) {
    color = shot.hit ? 'lightpink' : 'white';
  }
  return {backgroundColor: color};
};