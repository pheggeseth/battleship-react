import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import PlacementBoard from './PlacementBoard';

const player1 = {
  name: 'Paul',
  positions: {
    carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
    battleship: ['B1', 'B2', 'B3', 'B4'],
    cruiser: ['C1', 'C2', 'C3'],
    submarine: ['D1', 'D2', 'D3'],
    destroyer: ['E1', 'E2']
  }
};

const player2 = {
  name: 'Brianna',
  positions: {
    carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
    battleship: ['B1', 'B2', 'B3', 'B4'],
    cruiser: ['C1', 'C2', 'C3'],
    submarine: ['D1', 'D2', 'D3'],
    destroyer: ['E1', 'E2']
  }
};

export default class App extends Component {
  render() {
    return <Game player1={player1} player2={player2}/>;
    //return <PlacementBoard />
  }
}