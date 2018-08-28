import React, { Component } from 'react';
import PlacementBoard from './PlacementBoard';
import HomeBoard from './HomeBoard';
import AttackBoard from './AttackBoard';
import styled from 'styled-components';

const GameGrid  = styled.div`
  float: left;
  margin: 10px;
  display: grid;
  grid-template-rows: 300px 300px 150px 50px;
  grid-template-columns: 300px;
  grid-gap: 10px;
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
    this.handleShot = this.handleShot.bind(this);
    this.handleShipPlacement = this.handleShipPlacement.bind(this);
    this.handleReady = this.handleReady.bind(this);
  } // end constructor

  handleShipPlacement(ship) {
    this.props.onShipPlacement(this.props.player, ship);
  }

  handleReady() {
    this.props.onReady(this.props.player);
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
    let placementBoard, homeBoard, attackBoard, chatHistory, chatPrompt;
    const player = this.props.player;
    const shots = this.props.shots;
    const positions = this.props.positions;
    if (this.props.ready[this.props.player]) {
      homeBoard = <HomeBoard positions={positions} shots={shots.filter(shotsEnemyMade(player))}/>;
      attackBoard = <AttackBoard 
        // only send shots enemy has made, for rendering
        gameStart={this.props.ready.player1 && this.props.ready.player2}
        shots={shots.filter(shotsPlayerMade(player))}
        onClick={this.handleShot} />;
      chatHistory = <ChatHistory>
          Chat/Shot History
        </ChatHistory>;
      chatPrompt = <ChatPrompt>
          Chat Prompt
        </ChatPrompt>;
    } else {
      placementBoard = <PlacementBoard 
        shipPositions={positions} 
        onClick={this.handleShipPlacement} 
        onReady={this.handleReady}/>;
    }
    
    return (
      <GameGrid>
        {placementBoard}
        {homeBoard}
        {attackBoard}
        {chatHistory}
        {chatPrompt}
      </GameGrid>
    );
  }
}

const shotsPlayerMade = player => shot => shot.shootingPlayer === player;
const shotsEnemyMade = player => shot => shot.shootingPlayer !== player;