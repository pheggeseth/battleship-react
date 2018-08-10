import React, { Component } from 'react';
import Board from './Board';
import { Square } from './BoardStyles';

/* 
A1 A2 A3
B1 B2 B3
C1 C2 C3
need array of positions where ship is
on square hover, initialize the positions array to the position of the hovered square
if orientation is horizontal, add remaining square positions to positions array by incrementing column number
if orientation is vertical, add remaining square positions to positions array by incrementing row letter
*/


export default class PlacementBoard extends Component {
  constructor() {
    super();

  }
  toggleSquareHover() {

  }
  render() {
    return (
      <Board>
        <Square onMouseOver={() => console.log('hover')}/>
      </Board>
    );
  }
}