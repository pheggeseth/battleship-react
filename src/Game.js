import React, {Component} from 'react'
import PlacementBoard from './PlacementBoard';
import HomeBoard from './HomeBoard';
import BlankBoard from './BlankBoard';
import AttackBoard from './AttackBoard';
import styled from 'styled-components';

const GameGrid  = styled.div`
  // float: left;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // display: grid;
  // grid-template-rows: 300px 300px 150px 50px;
  // grid-template-columns: 300px;
  // grid-gap: 10px;
`;

const ChatHistory = styled.div`
  // height: 150px;
  width: 100%;
  padding: 10px;
  border: 1px solid;
  box-sizing: border-box;
  margin-top: 10px;
  overflow-y: scroll;
`;

// const ChatPrompt = styled.div`
//   height: 100%;
//   width: 100%;
//   border: 1px solid;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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
          // default ship positions for testing
          // carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
          // battleship: ['B1', 'B2', 'B3', 'B4'],
          // cruiser: ['C1', 'C2', 'C3'],
          // submarine: ['D1', 'D2', 'D3'],
          // destroyer: ['E1', 'E2']
          carrier: [],
          battleship: [],
          cruiser: [],
          submarine: [],
          destroyer: []
        },
        player2: {
          // default ship positions for testing
          // carrier: ['J6', 'J7', 'J8', 'J9', 'J10'],
          // battleship: ['I7', 'I8', 'I9', 'I10'],
          // cruiser: ['H8', 'H9', 'H10'],
          // submarine: ['G8', 'G9', 'G10'],
          // destroyer: ['F9', 'F10']
          carrier: [],
          battleship: [],
          cruiser: [],
          submarine: [],
          destroyer: []
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
      shots: [],
      chat: []
    };
  } // end constructor

  logChat = message => {
    console.log(message);
    this.setState(prevState => {
      prevState.chat.push(<li key={prevState.chat.length}>{message}</li>);
      return prevState;
    });
  };

  recordShot = (player, position) => {
    if (this.state.shots.find(shot => shot.shootingPlayer === player && shot.position === position)) return;
    const shot = {shootingPlayer: player, position: position};
    const shootingPlayer = shot.shootingPlayer;
    const shotPlayer = shootingPlayer === 'player1' ? 'player2' : 'player1';
    shot.hit = shipIfHit(shot.position, this.state.positions[shotPlayer]);
    const shipHit = shot.hit;
    
    // record shot, add hit to ship if needed and log correct message (in setState callback)
    this.setState(prevState => {
      prevState.shots.push(shot);
      if (shipHit) prevState.hitsLeft[shotPlayer][shipHit] -= 1;
      return prevState;
    }, () => {
      let message = `${this.props[shootingPlayer]} `;
      if (shipHit) {
        if(this.state.hitsLeft[shotPlayer][shipHit] === 0) {
          message += `sunk ${this.props[shotPlayer]}'s ${shot.hit}!!!`;
        } else {
          message += `scored a hit!`;
        }
      } else {
        message += `missed.`;
      }
      this.logChat(message);
    });
  }; // end recordShot

  saveShipPositions = (player, ship) => {
    this.setState(prevState => {
      prevState.positions[player][ship.name] = ship.positions;
      return prevState;
    });
  };

  playerReady = player => {
    this.setState(prevState => {
      prevState.ready[player] = true;
      return prevState;
    }, () => this.logChat(`${player} ready`));
  };

  generatePlayerBoard = player => {
    const positions = this.state.positions[player];
    const ready = this.state.ready[player];
    const board = [];
    if (ready === false) {
      board.push(<PlacementBoard key='PlacementBoard'
        player={player}
        shipPositions={positions} 
        onClick={this.saveShipPositions}
        onReady={this.playerReady}/>);
    } else {
      board.push(<HomeBoard key='HomeBoard' positions={positions} shots={this.state.shots.filter(shot => shot.shootingPlayer !== player)}/>);
      if (this.state.ready.player1 && this.state.ready.player2) {
        board.push(<AttackBoard key='AttackBoard'
          player={player}
          shots={this.state.shots.filter(shot => shot.shootingPlayer === player)}
          onClick={this.recordShot}/>)
      } else {
        board.push(<BlankBoard key='BlankBoard' />);
      }
      board.push(<ChatHistory key='ChatHistory'><ul>{this.state.chat}</ul></ChatHistory>);
      // board.push(<ChatPrompt key='ChatPrompt'>Chat Prompt</ChatPrompt>);
    }
    return board;
  };
  
  render() {
    const player1Board = this.generatePlayerBoard('player1');
    const player2Board = this.generatePlayerBoard('player2');
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{margin: 0}}>{this.props.player1}</h2>
          <GameGrid>
            {player1Board}
          </GameGrid>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{margin: 0}}>{this.props.player2}</h2>
          <GameGrid>
            {player2Board}
          </GameGrid>
        </div>
      </div>
    );
  } // end render
} // end Game

const shipIfHit = (position, positions) => {
  for (let ship in positions) {
    if (positions[ship].includes(position)) {
      return ship;
    }
  }
  return false;
};