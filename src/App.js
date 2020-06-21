import React from 'react';
import './App.css';
import {config} from './Config';

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
        row = {row}
        column = {column}
        color = {this.props.squares[row][column]}
        onClick = {() => this.props.onClick(row, column)}
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
      row.push(<div className = "board-row"> {column} </div>);
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
    this.state = {
      squares: [...Array(config.boardWidth)].map(() => Array(config.boardLength).fill(true))
    }
  }

  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          <Board 
            squares = {this.state.squares}
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
