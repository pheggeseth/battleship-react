import React, { Component } from 'react';
import './App.css';

import Board from './Board';

const player1Positions = {
  carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
  battleship: ['A2', 'B2', 'C2', 'D2'],
  cruiser: ['A3', 'B3', 'C3'],
  submarine: ['A4', 'B4', 'C4'],
  destroyer: ['A5', 'B5']
};

const player2Positions = {
  carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
  battleship: ['A2', 'B2', 'C2', 'D2'],
  cruiser: ['A3', 'B3', 'C3'],
  submarine: ['A4', 'B4', 'C4'],
  destroyer: ['A5', 'B5']
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Board player="player1" positions={player1Positions} onHit={hit} onMiss={miss}/>
		    <Board player="player2" positions={player2Positions} onHit={hit} onMiss={miss}/>
      </div>
    );
  }
}

function hit(player, ship) {
	console.log(`Hit ${player}'s ${ship}.`);
}

function miss() {
  console.log('miss');
}