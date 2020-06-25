/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

export const config = {
    boardWidth: 8,
    boardLength: 8,
    steps: { // key = difficulty, value = [stepMin, stepMax]
        1: [7, 10],
        2: [11, 15],
        3: [16, 25]
    },
    gamemodes: {
        classic: 1,
        blind: 2
    },
    difficulty: {
        easy: 1,
        medium: 2,
        hard: 3
    },
    resetButtonText: "Reset",
    newGameText: "New Game",
    timerText: "Time Elpased: ",
    winningText: "Congratulation! Your Time is:",
    targetBoardTitle: "Target Board",
    playBoardTitle: "Play Board",
    startMenuTitle: "Black White Tiles",
    startGameText: "Start Game",
    hideBoardText: "Hide",
    showBoardText: "Show",
    easyText: "Easy",
    mediumText: "Medium",
    hardText: "Hard",
    classicModeText: "Classic Mode",
    blindModeText: "Blind Mode",
    mainMenuText: "Main Menu"
};