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
    this._timer = null;
    this.state = {
      targetBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      exactMatch: false,
      resetTime: false
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
    if (this.state.exactMatch) {
      return;
    }
    var board = this.revertBlock(this.state.gameBoard, row, column);
    this.setState({
      gameBoard: board
    });

    if (checkExactMatch(this.state.targetBoard, this.state.gameBoard)) {
      this.setState({
        exactMatch: true
      });
      this.stopTime();
    }
  }

  generateGame() {
    var steps = randomInt(config.stepsMin, config.stepsMax + 1);
    var clicks = generateClicks(steps, this._width, this._length);
    var board = [...Array(this._width)].map(() => Array(this._length).fill(true));
    for (var i = 0; i < steps; i++) {
      board = this.revertBlock(board, clicks[i][0], clicks[i][1]);
    }
    this.setState({
      targetBoard: board
    });
  }

  componentDidMount() {
    this.generateGame();
    this.createTimer();
  }

  resetTime() {}
  stopTime() {}
  startTime() {}

  createTimer() {
    this._timer = 
      <Timer> 
        {({reset, stop, start}) => {
          this.resetTime = reset;
          this.stopTime = stop;
          this.startTime = start;

          return (
            <React.Fragment>
                  <Timer.Minutes formatValue={value => `${value} m `} />
                  <Timer.Seconds formatValue={value => `${value} s `} />
            </React.Fragment>
          );
        }}
      </Timer>
  }

  onResetBoardHandler() {
    this.setState({
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true))
    });
  }

  onNewGameHandler() {
    this.generateGame();
    this.onResetBoardHandler();
    this.setState({
      exactMatch: false
    })
    this.resetTime();
    this.startTime();
  }

  render() {
    let status = config.timerText;
    if (this.state.exactMatch) {
      status = config.winningText;
    }
  

    return (
      <div className = "game">

        <div className = "game-board">

          <div className = "board-title">
            <span> {config.targetBoardTitle} </span> 
          </div>

          <Board 
            squares = {this.state.targetBoard}
            clickable = {false}
          />

          <div className = "game-status">
            <span> {status} </span>
            <div> {this._timer} </div>
          </div>

        </div>

        <div className = "game-board">

          <div className = "board-title">
            <span> {config.playBoardTitle} </span>
          </div>

          <Board
            squares = {this.state.gameBoard}
            onClick = {(row, column) => this.handleClick(row, column)}
            clickable = {true}
          />
          
          <button 
            className = "newGame-button"
            onClick = {() => this.onNewGameHandler()}
          >
            {config.newGameText}
          </button>

          <button 
            className = "reset-button"
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
