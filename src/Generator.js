/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateClicks(steps, boardWidth, boardLength) {
    var clicks = [];
    for (var i = 0; i < steps; i++) {
        let randRow = randomInt(boardWidth);
        let randColumn = randomInt(boardLength);
        clicks.push([randRow, randColumn]);
    }
    return clicks;
}

export {
    generateClicks,
};