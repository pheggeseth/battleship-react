import React, { Component } from 'react';
import './App.css';
//import Board from './Board';
import Game from './Game';

const player1 = {
  name: 'Paul',
  positions: {
    carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
    battleship: ['A2', 'B2', 'C2', 'D2'],
    cruiser: ['A3', 'B3', 'C3'],
    submarine: ['A4', 'B4', 'C4'],
    destroyer: ['A5', 'B5']
  }
};

const player2 = {
  name: 'Brianna',
  positions: {
    carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
    battleship: ['A2', 'B2', 'C2', 'D2'],
    cruiser: ['A3', 'B3', 'C3'],
    submarine: ['A4', 'B4', 'C4'],
    destroyer: ['A5', 'B5']
  }
};

export default class App extends Component {
  render() {
    return <Game player1={player1} player2={player2}/>;
  }
}

// function hit(player, ship) {
// 	console.log(`Hit ${player}'s ${ship}.`);
// }

// function miss() {
//   console.log('miss');
// }