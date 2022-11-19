const COLUMNS = 7
const ROWS = 6


let state = Array(6).fill('').map(() => Array(7).fill(''));
state.blue=true;
state.winner = undefined

function buildBoard() {
    const board = document.querySelector(".board")
    board.style.gridTemplateRows=`repeat(${ROWS},12vw)`
    board.style.gridTemplateColumns=`repeat(${COLUMNS},12vw)`
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            let node = []
            let field = elt("div", {class: "field", gridRow:row, gridColumn:col},...node)
            field.addEventListener("click", () => {

                if (state.winner!==undefined){
                    return
                }
                let currentCol = field.getAttribute("gridColumn")
                let lowerSpot = lowestColumnEmptySpot(currentCol)
                if (lowerSpot>=ROWS){
                    return
                }
                let className
                if (state.blue===true){
                    className = "blue piece"
                }
                else {
                    className = "red piece"
                }
                let currField = document.querySelector(`[gridRow="${lowerSpot}"][gridColumn="${currentCol}"]`)

                currField.appendChild(elt("div",{class:className}))
                state[lowerSpot][currentCol]=className.at(0)
                checkWin()
                if(state.winner!==undefined){
                    displayWinner()
                    return;
                }

                state.blue = !state.blue
                let color
                if (state.blue===true){
                    color = "Blue"
                }
                else{
                    color = "Red"
                }
                document.getElementById("displayLabel").innerText=`${color}'s Turn`

            })
            board.appendChild(field)

        }
    }
}

function lowestColumnEmptySpot(col){
    for (let row = ROWS-1; row>=0; row-- ){
        if (state[row][col]===''){
            return row
        }
    }
    return ROWS
}

function checkWin(){

    //check horizontal
    let count = 0
    let symbol = state.blue===true ? 'b':'r'
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            if (count===4) {
                state.winner = symbol
                break
            }
            if (state[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
        }
    }

    //check vertical
    for (let col = 0; col <COLUMNS; col++){
        for (let row = 0; row<ROWS; row++){
            if (count === 4) {
                state.winner = symbol
                break
            }
            if (state[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
        }
    }

    //diagonal left to right
    //get all starting points
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
            if (count===4) {
                state.winner = symbol
                break
            }
            if (state[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            row++
            col++
        }
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
            if (count===4) {
                state.winner = symbol
                break
            }
            if (state[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            row++
            col--
        }
    }
}

function elt (type,attrs,...children){
    let node = document.createElement(type)
    for (let a in attrs){
        node.setAttribute(a,attrs[a])
    }
    for (let child of children){
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            let field = document.querySelector(`[gridRow="${row}"][gridColumn="${col}"]`)
            if (state[row][col] === '') {
                if (field.firstChild) {
                    field.removeChild(field.firstChild)
                }
                continue
            }

            else if (state[row][col] === 'b') {
                let node=field.firstChild
                if (node!==null){
                    node.setAttribute("class", "blue piece")

                }
                else {
                    field.appendChild(elt("div",{class:"blue piece"}))
                }
            }
            else if (state[row][col] === 'r') {
                let node = field.firstChild
                if (node!==null) {
                    node.setAttribute("class", "red piece")
                }
                else {
                    field.appendChild(elt("div",{class:"red piece"}))
                }
            }
        }
    }
}
function displayWinner(){
    let winner
    if (state.winner==='b'){
        winner = "Blue"
    }
    else {
        winner = "Red"
    }
    document.getElementById("displayLabel").innerText=`${winner} Wins!`
}


function restartGame(){
    const board = document.querySelector(".board");
    for (let field of board.children){
        if (field.firstChild) {
            field.removeChild(field.firstChild)
        }

    }
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            state[row][col]=''
            state.blue=true
        }
    }
    document.getElementById("displayLabel").innerText="Blue's Turn"

}

buildBoard()