/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

import React from 'react';
import './App.css';
import Timer from 'react-compound-timer';
import {config} from './Config';
import {randomInt, generateClicks} from './Generator';
import StartMenu from './StartMenu';

/**
 * A clickable sqaure
 * @param {JSON} props - See below for a list of props:
 * @param {Array[Number]} key - Only used to disable the warning in console
 * @param {Boolean} color - true represent a white tile, false represent a black tile
 * @param {Function} onClick - the function that should be called when the square is clicked
 * @param {Boolean} hindView - whether or not this square's color should be hidden 
 *                             (showing gray instead of black or white)
 * @return <button> - a html button element
 */
function Square(props) {
  var className = "square";
  if (props.hindView) className += " gray";
  else if (props.color) className += " white";
  else className += " black";

  return (
    <button 
      className = {className}
      onClick = {props.onClick}
    >
    </button>
  );
}

class Board extends React.Component {

  /**
   * render a square at the specified row and column
   * @param {Number} row - row number
   * @param {Number} column - column number
   * @return <Square> - a Square element with the supplied props
   */
  renderSquare(row, column){
    return (
      <Square
        key = {[row, column]} // not used, added to prevent warning message
        color = {this.props.squares[row][column]}
        onClick = {() => {
          if (this.props.clickable) return this.props.onClick(row, column)
          else return null
        }}
        hindView = {this.props.hindView}
      />
    )
  }

  /**
   * Create the m(width) by n(length) board by creating n squares on each of the m rows 
   */
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

  /**
   * renders the board by calling the createBoard() function
   */
  render() {
    return (
      <div>
        {this.createBoard()}
      </div>

    )
  }
}

class Game extends React.Component {
  /**
   * construct the states and private variables
   * @param {JSON} props - See below for a list of props
   * @param {Number} gameMode - the gamemode the user chose, see Config.js for mapping
   * @param {Number} difficulty - the difficulty the user chose, see Config.js for mapping
   * @param {Function} backToMainMenu - function that is called when user clicks the "Main Menu" button
   */
  constructor(props) {
    super(props);
    this._length = config.boardLength;
    this._width = config.boardWidth;
    this._timer = null;
    this._clicks = 0;
    this._showHideOperations = 0;
    this.state = {
      targetBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true)),
      gameInProgress: true,
      exactMatch: false,
      resetTime: false,
      hindTargetBoard: false
    };

    // in blind mode, user have to click "Start Game" to start the game
    if (this.props.gameMode === config.gamemodes.blind) {
      this.state.gameInProgress = false;
    }
  }

  /**
   * revert the color of the click tile AND all adjacent tiles around it
   * @param {Array[Array[Boolean]]} board - the game board that user can click on
   * @param {Number} row - the row of the tile that was clicked 
   * @param {Number} column - the column of the tile that was clicked
   */
  revertBlock(board, row, column) {
    board[row][column] = !board[row][column];
    // make sure index lies within the array boundary
    if (row - 1 >= 0) board[row - 1][column] = !board[row - 1][column];
    if (row + 1 < this._width) board[row + 1][column] = !board[row + 1][column];
    if (column - 1 >= 0) board[row][column - 1] = !board[row][column - 1];
    if (column + 1 < this._length) board[row][column + 1] = !board[row][column + 1];
    return board;
  }

  /**
   * handle user click on the gameboard tile
   * @param {Number} row - the row of the tile that was clicked 
   * @param {Number} column - the column of the tile that was clicked 
   */
  handleClick(row, column) {
    if (
      !this.state.gameInProgress || 
      (this.props.gameMode === config.gamemodes.blind && !this.state.hindTargetBoard)
    ) {
      return;
    }

    let board = this.revertBlock(this.state.gameBoard, row, column);
    this.setState({
      gameBoard: board
    });

    if (checkExactMatch(this.state.targetBoard, this.state.gameBoard)) {
      this.setState({
        exactMatch: true,
        gameInProgress: false,
        hindTargetBoard: false
      });
      this.stopTime();
    }

    this._clicks++;
  }

  /**
   * generate the games by generating random clicks on the target board
   * and form a target pattern
   */
  generateGame() {
    var difficultySteps = config.steps[this.props.difficulty];
    var steps = randomInt(difficultySteps[0], difficultySteps[1] + 1);
    var clicks = generateClicks(steps, this._width, this._length);
    var board = [...Array(this._width)].map(() => Array(this._length).fill(true));
    for (var i = 0; i < steps; i++) {
      board = this.revertBlock(board, clicks[i][0], clicks[i][1]);
    }
    this.setState({
      targetBoard: board
    });
  }

  /**
   * react function that will be called after compoent is mounted
   * this will generate the target pattern and start the timer
   */
  componentDidMount() {
    this.generateGame();
    this.createTimer();
  }

  /**
   * three functions declared to replace the reset, stop, and start function
   * to outside of the <Timer> component
   */
  resetTime() {}
  stopTime() {}
  startTime() {}

  /**
   * create the timer by creating the <Timer> component
   */
  createTimer() {
    this._timer = 
      <Timer> 
        {({reset, stop, start}) => {
          // sneaky way to move and use the function outside of the <Timer> component
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

  /**
   * reset the board by setting all tiles to white
   */
  onResetBoardHandler() {
    this.setState({
      gameBoard: [...Array(this._width)].map(() => Array(this._length).fill(true))
    });
  }

  /**
   * when new game is clicked, regenerate a target pattern and reset all varibles back
   * to its default state
   */
  onNewGameHandler() {
    this.generateGame();
    this.onResetBoardHandler();
    this.setState({
      exactMatch: false,
      gameInProgress: ((this.props.gameMode !== config.gamemodes.blind) ? true : false),
      hindTargetBoard: false
    })
    this._clicks = 0;
    this._showHideOperations = 0;
    this.resetTime();
    this.startTime();
  }

  /**
   * This button have three states
   * 1. Start Game - shows when the game is first generated, click on it will hide the 
   *                 target button and start the game
   * 2. Show - shows the target pattern and disable game board click
   * 3. Hide - hides the target pattern and enable game board click
   * @param {String} currentButtonText - contains text for one of the state above
   */
  onBlindModeButtonClickHandler(currentButtonText) {
    if (currentButtonText === config.showBoardText) {
      this.setState({
        hindTargetBoard: false
      });
      this._showHideOperations++;
    }
    else {
      this.setState({
        gameInProgress: true,
        hindTargetBoard: true
      });
    } 
  }

  /** 
   * Render the 2 board and all buttons
   */
  render() {
    // game status
    let status = config.inprogressText;
    if (this.state.exactMatch) {
      status = config.winningText;
    }
    
    // blind mode button text, only appears in blind mode
    let blindModeButtonText;
    if (!this.state.gameInProgress) {
      blindModeButtonText = config.startGameText;
    }
    else if (this.state.hindTargetBoard) {
      blindModeButtonText = config.showBoardText;
    }
    else {
      blindModeButtonText = config.hideBoardText;
    }

    // gamemode and difficulty information
    let gameModeInfo = (this.props.gameMode === config.gamemodes.classic) ? config.classicModeText : config.blindModeText;
    let difficultyInfo;
    if (this.props.difficulty === config.difficulty.easy) {
      difficultyInfo = "(" + config.easyText + ")";
    }
    else if (this.props.difficulty === config.difficulty.medium) {
      difficultyInfo = "(" + config.mediumText + ")";
    }
    else if (this.props.difficulty === config.difficulty.hard) {
      difficultyInfo = "(" + config.hardText + ")";
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
            hindView = {this.state.hindTargetBoard}
          />

          {this.props.gameMode === config.gamemodes.blind && 
            <button 
              className = "inGame-button"
              onClick = {() => this.onBlindModeButtonClickHandler(blindModeButtonText)}
            >
              {blindModeButtonText}
            </button>
          }

          <div className = "game-status">
            <span> {status} </span>
            <div> {config.timerText} {this._timer} </div>
            <div> {config.clickText} {this._clicks} </div>
            {this.props.gameMode === config.gamemodes.blind &&
              <div> {config.showhideText} {this._showHideOperations} </div>
            }
          </div>
        </div>

        <div className = "game-info">
          {gameModeInfo}
          <div> 
            {difficultyInfo}
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
            className = "inGame-button"
            onClick = {() => this.onNewGameHandler()}
          >
            {config.newGameText}
          </button>

          <button 
            className = "inGame-button"
            onClick = {() => this.onResetBoardHandler()}
          > 
            {config.resetButtonText}
          </button>

          <button 
            className = "inGame-button"
            onClick = {() => this.props.backToMainMenu()}
          > 
            {config.mainMenuText}
          </button>

        </div>

      </div>
    );
  }
}

/**
 * check if the target board is exactly the same as the game board
 * @param {Array[Array[Boolean]]} targetBoard - the target board
 * @param {Array[Array[Boolean]]}  gameBoard  - the game board
 */
function checkExactMatch(targetBoard, gameBoard) {
  for (var i = 0; i < targetBoard.length; i++) {
    // JSON.stringify converts array into a string for comparison
    if (JSON.stringify(targetBoard[i]) !== JSON.stringify(gameBoard[i])) {
      return false;
    }
  }
  return true;
}

class App extends React.Component {
  /**
   * construct the states
   * @param {JSON} props - no props in this class
   */
  constructor(props) {
    super(props);
    this.state = {
      gameModeSelected: 0, // 0 - None Selected, 1 - Classic, 2 - Blind
      difficulty: 0, // 0 - None Selected, 1 - Easy, 2 - Medium, 3 - Hard
      startGame: false
    }  
  }

  /**
   * handler when user choose a gamemode and difficulty to start the game
   * @param {Number} gameMode - gamemode that user chose, see Config.js for enum
   * @param {Number} difficulty - difficulty that user chose, see Config.js for enum
   */
  onStartGameButtonClickHandler(gameMode, difficulty) {
    this.setState({
      gameModeSelected: gameMode,
      difficulty: difficulty,
      startGame: true
    });
  }

  /**
   * Handler for clicking the "Main Menu" button
   */
  onBackToMainMenuHandler() {
    this.setState({
      startGame: false
    });
  }

  /**
   * Render either the <Game> component or the <StartMenu> component
   */
  render() {
    if (this.state.startGame) {
      return (
        <Game 
          gameMode = {this.state.gameModeSelected}
          difficulty = {this.state.difficulty}
          backToMainMenu = {() => this.onBackToMainMenuHandler()}
        />
      );
    } else {
      return (
        <StartMenu
          startGameHandler = {
            (gameMode, difficulty) => this.onStartGameButtonClickHandler(gameMode, difficulty)
          }
        />
      );
    }
  }
}

export default App;
