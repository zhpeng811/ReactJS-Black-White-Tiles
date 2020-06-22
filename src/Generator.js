/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateClicks(steps, boardWidth, boardLength) {
    var clicks = [];
    for (var i = 0; i < steps; i++) {
        let randRow = randomInt(0, boardWidth);
        let randColumn = randomInt(0, boardLength);
        clicks.push([randRow, randColumn]);
    }
    return clicks;
}

export {
    randomInt,
    generateClicks,
};