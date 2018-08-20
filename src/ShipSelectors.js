import React from 'react';

export default function PlacementSelectors(props) {
  return (
    <div>
      <div>
        <button disabled={props.currentShip === 'carrier'} onClick={() => props.changeShip('carrier')}>Carrier</button>
        <button disabled={props.currentShip === 'battleship'} onClick={() => props.changeShip('battleship')}>Battleship</button>
        <button disabled={props.currentShip === 'cruiser'} onClick={() => props.changeShip('cruiser')}>Cruiser</button>
        <button disabled={props.currentShip === 'submarine'} onClick={() => props.changeShip('submarine')}>Submarine</button>
        <button disabled={props.currentShip === 'destroyer'} onClick={() => props.changeShip('destroyer')}>Destroyer</button>
      </div>
      <div>
        <button disabled={props.currentDirection === 'horizontal'} onClick={() => props.changeDirection('horizontal')}>Horizontal</button>
        <button disabled={props.currentDirection === 'vertical'} onClick={() => props.changeDirection('vertical')}>Vertical</button>
      </div>
    </div>
  );
}