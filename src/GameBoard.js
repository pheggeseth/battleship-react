import React, { Component } from 'react';
import HomeBoard from './HomeBoard';
import AttackBoard from './AttackBoard';
import styled from 'styled-components';

const GameGrid  = styled.div`
  float: left;
  margin: 10px;
  display: grid;
  grid-template-rows: 300px 400px;
  grid-template-columns: 300px 400px;
`;
const HomeBoardGridPosition = {
  gridColumn: '1 / 3',
  gridRow: '1 / 3'
};
const AttackBoardGridPosition = {
  gridColumn: '3 / span 1;',
  gridRow: '2 / span 2;'
};
/*
  props: playerName, onHit, onMiss
*/

const shipIfHit = (position, positions) => {
  for (let ship in positions) {
    if (positions[ship].includes(position)) {
      return ship;
    }
  }
  return false;
};

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // positions: {
      //   carrier: [],
      //   battleship: [],
      //   cruiser: [],
      //   submarine: [],
      //   destroyer: []
      // },
      positions: {
        carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
        battleship: ['B1', 'B2', 'B3', 'B4'],
        cruiser: ['C1', 'C2', 'C3'],
        submarine: ['D1', 'D2', 'D3'],
        destroyer: ['E1', 'E2']
      },
      readyToPlay: true // should be set to false to start
    };
    this.handleShot = this.handleShot.bind(this);
  } // end constructor

  handleShipPlacement(ship) {
    this.setState(prevState => {
      prevState.positions[ship.name] = ship.positions;
      return prevState;
    });
  }

  readyToPlay() {
    this.setState({
      readyToPlay: true
    });
    console.log(`this.props.player ready`);
    // notify socket.io of ready to play, send positions
    // display attack board when other player is ready to play
  }

  handleShot(position) {
    this.props.onShot({
      shootingPlayer: this.props.player,
      position: position,
      hit: shipIfHit(position, this.state.positions)
    });
  }
  
  render() {
    let attackBoard = null;
    if (this.state.readyToPlay) {
      attackBoard = <AttackBoard 
                      // style={AttackBoardGridPosition}
                      // playerName={this.props.player} 
                      playerPositions={this.state.positions} 
                      // only send shots enemy has made, for rendering
                      shots={this.props.shots.filter(shot => shot.shootingPlayer !== this.props.player)}
                      onClick={this.handleShot} />;
    }
                        

    return (
      <GameGrid>
        <HomeBoard 
          // style={HomeBoardGridPosition}
          onClick={this.handleShipPlacement} />
        {attackBoard}
      </GameGrid>
    );
  }
}
/* <AttackBoard 
          playerName={this.props.player1.name} 
          playerPositions={this.props.player1.positions} 
          onHit={this.hit} 
          onMiss={this.miss} /> */