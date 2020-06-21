/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

import React from 'react';
import './App.css';
import {config} from './Config';
import {generateClicks} from './Generator';

function Square(props){
  const className = "square" + (props.color ? " white" : " black");
  return (
    <button 
      className = {className}
      onClick = {props.onClick}
    >
    </button>
  )
}

class Board extends React.Component {

  renderSquare(row, column){
    return (
      <Square
        key = {[row, column]}
        color = {this.props.squares[row][column]}
        onClick = {() => {
          if (this.props.clickable) return this.props.onClick(row, column)
          else return null
        }}
      />
    )
  }

  createBoard() {
    let row = [];
    for (let i = 0; i < config.boardWidth; i++) {
      let column = [];
      for (let j = 0; j < config.boardLength; j++) {
        column.push(this.renderSquare(i, j));
      }
      row.push(<div className = "board-row" key = {i}> {column} </div>);
    }

    return row;
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>

    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this._length = config.boardLength;
    this._width = config.boardWidth;
    this.state = {
      targetBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      gameboard: [...Array(this._width)].map(() => Array(this._length).fill(true))
    }
  }

  revertBlock(board, row, column) {
    board[row][column] = !board[row][column];
    if (row - 1 >= 0) board[row - 1][column] = !board[row - 1][column];
    if (row + 1 < this._width) board[row + 1][column] = !board[row + 1][column];
    if (column - 1 >= 0) board[row][column - 1] = !board[row][column - 1];
    if (column + 1 < this._length) board[row][column + 1] = !board[row][column + 1];
    return board;
  }

  handleClick(row, column) {
    var board = this.revertBlock(this.state.gameboard, row, column);
    this.setState({
      gameboard: board
    });
  }

  generateGame() {
    var steps = 10;
    var clicks = generateClicks(steps, this._width, this._length);
    var board = this.state.targetBoard;
    for (var i = 0; i < steps; i++) {
      board = this.revertBlock(board, clicks[i][0], clicks[i][1]);
    }
    this.setState({
      targetBoard: board
    });
  }

  componentDidMount() {
    this.generateGame();
  }

  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          <Board 
            squares = {this.state.targetBoard}
            clickable = {false}
          />
        </div>
        <div className = "game-board">
          <Board
            squares = {this.state.gameboard}
            onClick = {(row, column) => this.handleClick(row, column)}
            clickable = {true}
          />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <Game />
  );
}

export default App;
