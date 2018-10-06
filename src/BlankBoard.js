import React from 'react';
import Board from './Board';
import { Square } from './BoardStyles';

export default function BlankBoard() {
  const squares = [];
  for (let i = 0; i < 100; i++) {
    squares.push(<Square key={i} />)
  }
  return <Board>{squares}</Board>;
}