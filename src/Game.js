import React, {Component} from 'react'
import GameBoard from './GameBoard';

export default class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ready: {
        player1: false,
        player2: false
      },
      positions: {
        player1: {
          carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
          battleship: ['B1', 'B2', 'B3', 'B4'],
          cruiser: ['C1', 'C2', 'C3'],
          submarine: ['D1', 'D2', 'D3'],
          destroyer: ['E1', 'E2']
        },
        player2: {
          carrier: ['J6', 'J7', 'J8', 'J9', 'J10'],
          battleship: ['I7', 'I8', 'I9', 'I10'],
          cruiser: ['H8', 'H9', 'H10'],
          submarine: ['G8', 'G9', 'G10'],
          destroyer: ['F9', 'F10']
        }
      },
      hitsLeft: {
        player1: {
          carrier: 5,
          battleship: 4,
          cruiser: 3,
          submarine: 3,
          destroyer: 2
        },
        player2: {
          carrier: 5,
          battleship: 4,
          cruiser: 3,
          submarine: 3,
          destroyer: 2
        }
      },
      shots: []
    };

    this.recordShot = this.recordShot.bind(this);
    this.saveShipPositions = this.saveShipPositions.bind(this);
    this.playerReady = this.playerReady.bind(this);
  } // end constructor

  recordShot(shot) {
    const shootingPlayer = shot.shootingPlayer;
    const shotPlayer = shootingPlayer === 'player1' ? 'player2' : 'player1';
    shot.hit = shipIfHit(shot.position, this.state.positions[shotPlayer]);
    this.setState(prevState => {
      prevState.shots.push(shot);
      if (shot.hit) {
        prevState.hitsLeft[shotPlayer][shot.hit] -= 1;
        if (prevState.hitsLeft[shotPlayer][shot.hit] === 0) {
          console.log(`${this.props[shootingPlayer]} sunk ${this.props[shotPlayer]}'s ${shot.hit}!!!`);
        } else {
          console.log(`${this.props[shootingPlayer]} scored a hit!`);
        }
      } else {
        console.log(`${this.props[shootingPlayer]} missed.`);
      }
      return prevState;
    });
  } // end recordShot

  saveShipPositions(player, ship) {
    this.setState(prevState => {
      prevState.positions[player][ship.name] = ship.positions;
      return prevState;
    });
  }

  playerReady(player) {
    this.setState(prevState => {
      prevState.ready[player] = true;
      return prevState;
    });
  }

  render() {
    return (
      <div>
        <GameBoard 
          player="player1"
          positions={this.state.positions.player1}
          onShipPlacement={this.saveShipPositions}
          ready={this.state.ready}
          onReady={this.playerReady}
          shots={this.state.shots}
          onShot={this.recordShot} />
        <GameBoard 
          player="player2"
          positions={this.state.positions.player2}
          onShipPlacement={this.saveShipPositions}
          ready={this.state.ready}
          onReady={this.playerReady}
          shots={this.state.shots}
          onShot={this.recordShot} />
      </div>
    );
  } // end render
} // end Game

/*
  shot = {
    shootingPlayer: string,
    position: string,
  }
*/

const shipIfHit = (position, positions) => {
  for (let ship in positions) {
    if (positions[ship].includes(position)) {
      return ship;
    }
  }
  return false;
};