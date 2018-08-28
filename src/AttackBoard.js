import React, { Component } from 'react';
import Board, { positionFromIndex } from './Board';
import { Square } from './BoardStyles';

export default class AttackBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null
    };
    this.toggleSquareHover = this.toggleSquareHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  toggleSquareHover(e) {
    let hovering;
    if (e.type === 'mouseleave') hovering = null;
    if (e.type === 'mouseenter') hovering = e.target.dataset.position;
    this.setState({
      hovering: hovering
    });
  }

  handleClick(e) {
    this.props.onClick(this.props.player, e.target.dataset.position);
  }
  
  render() {
    // fill squares array with 100 Square components, each with its own position 'A1'-'J10'
    const squares = [];
    for(let i = 0; i < 100; i++) {
      let position = positionFromIndex(i);
      let style = getBackgroundColor(position, this.props.shots);
      if (style.backgroundColor === 'powderblue' && this.state.hovering === position) {
        style.backgroundColor = 'lightyellow';
      }
      squares.push(
        <Square key={position} 
          data-position={position} 
          style={style} 
          onMouseEnter={this.toggleSquareHover}
          onMouseLeave={this.toggleSquareHover}
          onClick={this.handleClick} />);
    }
    
    return <Board>{squares}</Board>;
  }
}

const getBackgroundColor = (position, shots) => {
  let color = 'powderblue';
  let shot = shots.find(shot => shot.position === position);
  if (shot) color = shot.hit ? 'pink' : 'white';
  return {backgroundColor: color};
}
