import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

export default function BlankBoard() {
  const squares = [];
  let position;
  for (let i = 0; i < 100; i++) {
    // position = positionFromIndex(i);
    squares.push(<Square key={i} />)
  }
  return <Board>{squares}</Board>;
}