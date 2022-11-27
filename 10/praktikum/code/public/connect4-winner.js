ROWS = 6
COLUMNS =7

function connect4Winner(symbol,board){
    //check horizontal
    let count = 0
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            if (board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                return true
            }
        }
        count = 0
    }

    //check vertical
    count = 0
    for (let col = 0; col <COLUMNS; col++){
        for (let row = 0; row<ROWS; row++){
            if (board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count === 4) {
                return true;
            }
        }
        count = 0
    }

    //diagonal left to right
    //get all starting points
    count = 0
    let startingPoints = []
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            if (row===0 || col===0){
                startingPoints.push([row,col])
            }
        }
    }
    for (let point of startingPoints){
        let row = point[0]
        let col = point[1]
        while (row<ROWS && col<COLUMNS){
            if (board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                return true
            }
            row++
            col++
        }
        count = 0
    }


    //diagonal right to left
    //get all starting points
    startingPoints = []
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            if (row===0 || col===COLUMNS-1){
                startingPoints.push([row,col])
            }
        }
    }
    for (let point of startingPoints){
        let row = point[0]
        let col = point[1]
        while (row<ROWS && col>=0){
            if (board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                return true;
            }
            row++
            col--
        }
        count = 0
    }
}
module.exports = { connect4Winner }