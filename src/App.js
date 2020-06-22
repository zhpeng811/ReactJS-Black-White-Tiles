/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

import React from 'react';
import './App.css';
import Timer from 'react-compound-timer';
import {config} from './Config';
import {randomInt, generateClicks} from './Generator';

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
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      exactMatch: false
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
    var board = this.revertBlock(this.state.gameBoard, row, column);
    this.setState({
      gameBoard: board
    });

    if (checkExactMatch(this.state.targetBoard, this.state.gameBoard)) {
      this.setState({
        exactMatch: true
      })
    }
  }

  generateGame() {
    var steps = randomInt(config.stepsMin, config.stepsMax + 1);
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

  onResetBoardHandler() {
    this.setState({
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true))
    });
  }

  render() {
    let status = config.timerText;
    let timer;
    if (this.state.exactMatch) {
      status = config.winningText;
      timer = null;
    } else {
      timer = 
      <Timer> 
        <Timer.Minutes formatValue={value => `${value} m `} />
        <Timer.Seconds formatValue={value => `${value} s `} />
      </Timer>;
    }

    return (
      <div className = "game">
        <div className = "game-board">
          <Board 
            squares = {this.state.targetBoard}
            clickable = {false}
          />
          <div className = "game-status">
            <span> {status} </span>
            <span> {timer} </span>
          </div>
        </div>
        <div className = "game-board">
          <Board
            squares = {this.state.gameBoard}
            onClick = {(row, column) => this.handleClick(row, column)}
            clickable = {true}
          />
          <button 
            className = "buttonReset"
            onClick = {() => this.onResetBoardHandler()}
          > 
          {config.resetButtonText}
          </button>
        </div>
      </div>
    );
  }
}

function checkExactMatch(targetBoard, gameBoard) {
  for (var i = 0; i < targetBoard.length; i++) {
    if (JSON.stringify(targetBoard[i]) !== JSON.stringify(gameBoard[i])) {
      return false;
    }
  }
  return true;
}

function App() {
  return (
    <Game />
  );
}

export default App;
