import React, { Component } from 'react';
import PlacementBoard from './PlacementBoard';
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
      readyToPlay: false // should be set to false to start
    };
    this.handleShot = this.handleShot.bind(this);
    this.handleShipPlacement = this.handleShipPlacement.bind(this);
    this.readyToPlay = this.readyToPlay.bind(this);
  } // end constructor

  handleShipPlacement(ship) {
    this.props.onShipPlacement(this.props.player, ship);
  }

  readyToPlay() {
    this.setState({
      readyToPlay: true
    });
    console.log(`${this.props.player} ready`);
    // TODO: notify socket.io of ready to play, send positions
    // display attack board when other player is ready to play
  }

  handleShot(position) {
    if (this.props.shots.find(shot => shot.shootingPlayer === this.props.player && shot.position === position)) return;

    this.props.onShot({
      shootingPlayer: this.props.player,
      position: position,
      hit: shipIfHit(position, this.props.positions)
    });
  }
  
  render() {
    let placementBoard, homeBoard, attackBoard, chatHistory, enemyHits, chatPrompt;
    const player = this.props.player;
    const shots = this.props.shots;
    const positions = this.props.positions;
    if (this.state.readyToPlay === false) {
      placementBoard = <PlacementBoard shipPositions={positions} onClick={this.handleShipPlacement} onReady={this.readyToPlay}/>;
    } else {
      homeBoard = <HomeBoard positions={positions} shots={shots.filter(shotsEnemyMade(player))}/>;
      attackBoard = <AttackBoard 
        // only send shots enemy has made, for rendering
        shots={shots.filter(shotsPlayerMade(player))}
        onClick={this.handleShot} />;
      chatHistory = <ChatHistory>
          Chat/Shot History
        </ChatHistory>;
      enemyHits = <EnemyHits>
          Hits on enemy ships
        </EnemyHits>;
      chatPrompt = <ChatPrompt>
          Chat Prompt
        </ChatPrompt>;
    }
    
    return (
      <GameGrid>
        {placementBoard}
        {homeBoard}
        {attackBoard}
        {chatHistory}
        {enemyHits}
        {chatPrompt}
      </GameGrid>
    );
  }
}

const shotsPlayerMade = player => shot => shot.shootingPlayer === player;
const shotsEnemyMade = player => shot => shot.shootingPlayer !== player;