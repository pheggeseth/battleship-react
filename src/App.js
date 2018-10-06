import React, { Component } from 'react';
import styled from 'styled-components';
import Game from './Game';

const AppContainer = styled.div`
  width: 100%;
`;

const GameContainer = styled.div`
  width: 700px;
  background-color: whitesmoke;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(0,0,0,0.5);
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <GameContainer>
          <h1 style={{margin: 0, marginTop: '10px'}}>React Battleship</h1>
          <p style={{textAlign: 'center'}}>
            This two-player Battleship game is built with React and styled-components.
            First, choose the ship positions for each player by clicking on a ship and either horitzontal or vertical for the direction.
            Once both players have placed all ships and are ready to play, the game begins.
            Hits and misses are logged in the box at the bottom.
          </p>
          <Game player1="Player 1" player2="Player 2" />
        </GameContainer>
      </AppContainer>
    );
  }
}