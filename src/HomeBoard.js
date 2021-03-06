import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';
import { shipColors } from './ShipSelectors';

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
  
  for (let ship in shipPositions) {
    if (shipPositions[ship].includes(squarePosition)) {
      color = shipColors[ship];
    }
  }
  
  let shot = shots.find(shot => shot.position === squarePosition);
  if (shot) {
    color = shot.hit ? 'lightpink' : 'white';
  }
  return {backgroundColor: color};
};