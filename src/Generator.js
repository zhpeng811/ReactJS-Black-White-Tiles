/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

/**
 * generate a random integer between [min, max) - min included, max excluded
 * @param {Number} min - minimum number for generation
 * @param {Number} max - maximum number for generation, the number itself is NOT included
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * generate an array of length n(n = steps) each contain a row and column
 * where each row and column will lie within the boardWidth * boardLength boundary 
 * @param {Number} steps - number of steps/clicks 
 * @param {Number} boardWidth - board vertical size
 * @param {Number} boardLength - board horizontal size
 */
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