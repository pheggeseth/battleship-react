import React, {Component} from 'react';
import GameBoard from './GameBoard';

const ships = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      [this.props.player1.name]: Object.assign({}, ships),
      [this.props.player2.name]: Object.assign({}, ships)
    };

    this.hit = this.hit.bind(this);
    this.miss = this.miss.bind(this);
  } // end constructor

  hit(playerName, shipName) {
    this.setState(prevState => {
      prevState[playerName][shipName] -= 1;
      console.log(`${prevState[playerName][shipName] ? 'Hit' : 'Sunk'} ${playerName}'s ${shipName}.`);
      return prevState;
    });
  }

  miss() {
    console.log('Miss.');
  }

  render() {
    return (
      <div>
        <GameBoard 
          playerName={this.props.player1.name} 
          playerPositions={this.props.player1.positions} 
          onHit={this.hit} 
          onMiss={this.miss} />
        <GameBoard 
          playerName={this.props.player2.name} 
          playerPositions={this.props.player2.positions} 
          onHit={this.hit} 
          onMiss={this.miss} />
      </div>
    );
  }
}