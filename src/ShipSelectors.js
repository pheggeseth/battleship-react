import React from 'react';

// <ShipSelectors 
//   currentShip={this.state.currentShip}
//   currentDirection={this.state.currentDirection}
//   changeShip={this.setCurrentShip}
//   changeDirection={this.setCurrentDirection} />

export const shipColors = {
  carrier: 'palegreen',
  battleship: 'plum',
  cruiser: 'tomato',
  submarine: 'burlywood',
  destroyer: 'lemonchiffon'
};

export default function ShipSelectors(props) {
  return (
    <div>
      <div>
        <button style={{backgroundColor: shipColors.carrier}} disabled={props.currentShip === 'carrier'} onClick={() => props.changeShip('carrier')}>Carrier</button>
        <button style={{backgroundColor: shipColors.battleship}} disabled={props.currentShip === 'battleship'} onClick={() => props.changeShip('battleship')}>Battleship</button>
        <button style={{backgroundColor: shipColors.cruiser}} disabled={props.currentShip === 'cruiser'} onClick={() => props.changeShip('cruiser')}>Cruiser</button>
        <button style={{backgroundColor: shipColors.submarine}} disabled={props.currentShip === 'submarine'} onClick={() => props.changeShip('submarine')}>Submarine</button>
        <button style={{backgroundColor: shipColors.destroyer}} disabled={props.currentShip === 'destroyer'} onClick={() => props.changeShip('destroyer')}>Destroyer</button>
      </div>
      <div>
        <button disabled={props.currentDirection === 'horizontal'} onClick={() => props.changeDirection('horizontal')}>Horizontal</button>
        <button disabled={props.currentDirection === 'vertical'} onClick={() => props.changeDirection('vertical')}>Vertical</button>
      </div>
    </div>
  );
}