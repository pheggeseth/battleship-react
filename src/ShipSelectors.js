import React from 'react';
import styled from 'styled-components';

import { Button } from './BoardStyles';

export const shipColors = {
  carrier: 'palegreen',
  battleship: 'plum',
  cruiser: 'tomato',
  submarine: 'burlywood',
  destroyer: 'lemonchiffon'
};

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  
`;

const ButtonsLabel = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.25em;
  font-weight: bold;
  margin: 5px auto;
`;



export default function ShipSelectors(props) {
  return (
    <div>
      <ButtonsContainer>
        <ButtonsLabel>Ship</ButtonsLabel>
        <Button style={{backgroundColor: shipColors.carrier}} disabled={props.currentShip === 'carrier'} onClick={() => props.changeShip('carrier')}>Carrier</Button>
        <Button style={{backgroundColor: shipColors.battleship}} disabled={props.currentShip === 'battleship'} onClick={() => props.changeShip('battleship')}>Battleship</Button>
        <Button style={{backgroundColor: shipColors.cruiser}} disabled={props.currentShip === 'cruiser'} onClick={() => props.changeShip('cruiser')}>Cruiser</Button>
        <Button style={{backgroundColor: shipColors.submarine}} disabled={props.currentShip === 'submarine'} onClick={() => props.changeShip('submarine')}>Submarine</Button>
        <Button style={{backgroundColor: shipColors.destroyer}} disabled={props.currentShip === 'destroyer'} onClick={() => props.changeShip('destroyer')}>Destroyer</Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <ButtonsLabel>Direction</ButtonsLabel>
        <Button disabled={props.currentDirection === 'horizontal'} onClick={() => props.changeDirection('horizontal')}>Horizontal</Button>
        <Button disabled={props.currentDirection === 'vertical'} onClick={() => props.changeDirection('vertical')}>Vertical</Button>
      </ButtonsContainer>
    </div>
  );
}