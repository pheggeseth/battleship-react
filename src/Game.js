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
    }
    - shots: [
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
      // [this.props.player1.name]: Object.assign({}, ships),
      // [this.props.player2.name]: Object.assign({}, ships),
      player1: Object.assign({}, ships),
      player2: Object.assign({}, ships),
      shots: []
    };

    // this.hit = this.hit.bind(this);
    // this.miss = this.miss.bind(this);
    this.recordShot = this.recordShot.bind(this);
  } // end constructor

  // hit(playerName, shipName) {
  //   this.setState(prevState => {
  //     prevState[playerName][shipName] -= 1;
  //     console.log(`${prevState[playerName][shipName] ? 'Hit' : 'Sunk'} ${playerName}'s ${shipName}.`);
  //     return prevState;
  //   });
  // }

  // miss() {
  //   console.log('Miss.');
  // }

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
  }

  render() {
    return (
      <div>
        {/* <AttackBoard 
          playerName={this.props.player1.name} 
          playerPositions={this.props.player1.positions} 
          onHit={this.hit} 
          onMiss={this.miss} />
        <AttackBoard 
          playerName={this.props.player2.name} 
          playerPositions={this.props.player2.positions} 
          onHit={this.hit} 
          onMiss={this.miss} /> */}
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
  }
}

/*
  shot = {
    shootingPlayer: string,
    position: string,
    hit: shipName or false
  }
*/