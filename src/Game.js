import React, {Component} from 'react';
// import AttackBoard from './AttackBoard';
import GameBoard from './GameBoard';

const ships = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
};
/* 
Game
  - state
    - ships: {
      player1: ships,
      player2: ships
    }
    - shots: [ each shot is object:
      {
        shootingPlayer: string,
        position: string,
        hit: shipName or false
      }
    ]
  - props
    - player1: 'name',
    - player2: 'name'
*/

export default class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      player1: Object.assign({}, ships),
      player2: Object.assign({}, ships),
      shots: []
    };

    this.recordShot = this.recordShot.bind(this);
  } // end constructor

  recordShot(shot) {
    const shootingPlayer = shot.shootingPlayer;
    const shotPlayer = shootingPlayer === 'player1' ? 'player2' : 'player1';
    this.setState(prevState => {
      prevState.shots.push(shot);
      if (shot.hit) { // currently allows negative hits
        prevState[shotPlayer][shot.hit] -= 1;
        let hitOrSunk = prevState[shotPlayer][shot.hit] ? 'hit' : 'sunk';
        console.log(`${this.props[shootingPlayer]} ${hitOrSunk} ${this.props[shotPlayer]}'s ${shot.hit}.`);
      } else {
        console.log(`${this.props[shootingPlayer]} missed.`);
      }
      return prevState;
    });
  } // end recordShot

  render() {
    return (
      <div>
        <GameBoard 
          player="player1"
          shots={this.state.shots}
          onShot={this.recordShot} />
        <GameBoard 
          player="player2"
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
    hit: shipName or false
  }
*/