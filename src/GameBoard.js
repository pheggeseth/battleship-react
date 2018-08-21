import React, { Component } from 'react';
import HomeBoard from './HomeBoard';
import AttackBoard from './AttackBoard';
import styled from 'styled-components';

const GameGrid  = styled.div`
  float: left;
  margin: 10px;
  display: grid;
  grid-template-rows: 300px 150px 50px;
  grid-template-columns: 300px 300px;
  grid-gap: 10px;
`;

const EnemyHits = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: auto / auto / span 2 / span 1;
`;

const ChatHistory = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatPrompt = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      positions: { // default positions until PlacementBoard gets hooked up with GameBoard and supplies positions to it
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
    // TODO: notify socket.io of ready to play, send positions
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
      attackBoard = 
      <AttackBoard 
        playerPositions={this.state.positions} 
        // only send shots enemy has made, for rendering
        shots={this.props.shots.filter(shot => shot.shootingPlayer !== this.props.player)}
        onClick={this.handleShot} />;
    }
    
    return (
      <GameGrid>
        <HomeBoard onClick={this.handleShipPlacement} />
        {attackBoard}
        <ChatHistory>
          Chat/Shot History
        </ChatHistory>
        <EnemyHits>
          Hits on enemy ships
        </EnemyHits>
        <ChatPrompt>
          Chat Prompt
        </ChatPrompt>
      </GameGrid>
    );
  }
}
