

const COLUMNS = 7
const ROWS = 6
ROWWIDTH = 12
COLUMNWIDTH = 12



let state = {}
state.board= Array(ROWS).fill('').map(() => Array(COLUMNS).fill(''));
state.blue=true;
state.winner = null;

function buildBoard() {
    document.getElementById("displayLabel").innerText="Blue's Turn"
    document.getElementById("displayLabel").style.color="blue"
    const board = document.querySelector(".board")
    board.style.gridTemplateRows=`repeat(${ROWS},${ROWWIDTH}vw)`
    board.style.gridTemplateColumns=`repeat(${COLUMNS},${COLUMNWIDTH}vw)`
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            let node = []
            let field = elt("div", {class: "field", gridRow:row, gridColumn:col},...node)
            field.addEventListener("click", () => {

                if (state.winner!==null){
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
                state.board[lowerSpot][currentCol]=className.at(0)
                checkWin()
                if(state.winner!==null){
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
                //set loadlabel to empty
                document.getElementById("saveLoadLabel").innerText=""
                document.getElementById("displayLabel").innerText=`${color}'s Turn`
                // set the color of the label to the color of the next player
                document.getElementById("displayLabel").style.color = color.toLowerCase()

            })
            board.appendChild(field)

        }
    }
}

function lowestColumnEmptySpot(col){
    for (let row = ROWS-1; row>=0; row-- ){
        if (state.board[row][col]===''){
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
            if (state.board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                state.winner = symbol
                break
            }
        }
        count = 0
    }

    //check vertical
    count = 0
    for (let col = 0; col <COLUMNS; col++){
        for (let row = 0; row<ROWS; row++){
            if (state.board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count === 4) {
                state.winner = symbol
                break
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
            if (state.board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                state.winner = symbol
                break
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
            if (state.board[row][col]===symbol){
                count++
            }
            else {
                count = 0;
            }
            if (count===4) {
                state.winner = symbol
                break
            }
            row++
            col--
        }
        count = 0
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

    if (state.blue===true){
        document.getElementById("displayLabel").innerText="Blue's Turn"
        document.getElementById("displayLabel").style.color="blue"
    }
    if (state.winner!=null){
        displayWinner()
    }
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            let field = document.querySelector(`[gridRow="${row}"][gridColumn="${col}"]`)
            if (state.board[row][col] === '') {
                if (field.firstChild) {
                    field.removeChild(field.firstChild)
                }
            }

            else if (state.board[row][col] === 'b') {
                let node=field.firstChild
                if (node!==null){
                    node.setAttribute("class", "blue piece")

                }
                else {
                    field.appendChild(elt("div",{class:"blue piece"}))
                }
            }
            else if (state.board[row][col] === 'r') {
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
    if (state.winner==='r'){
        winner = "Red"
    }

    document.getElementById("displayLabel").innerText=`${winner} Wins!`
    document.getElementById("newGame").style.animation="blink 1300ms infinite"
}


function restartGame(){
    document.getElementById("newGame").style.animation="none"
    const board = document.querySelector(".board");
    for (let field of board.children){
        if (field.firstChild) {
            field.removeChild(field.firstChild)
        }

    }
    for (let row = 0; row <ROWS; row++){
        for (let col = 0; col<COLUMNS; col++){
            state.board[row][col]=''
            state.blue=true
        }
    }
    document.getElementById("displayLabel").innerText="Blue's Turn"
    document.getElementById("displayLabel").style.color="blue"
    state.winner=null

}

function loadGame(){
    let url =  "http://localhost:3000/"
    let datakey = 1234567890
    fetch(url + "api/data/" + datakey + "?api-key=c4game")
        .then(response => response.json())
        .then(data => {
            state = data;
            showBoard()
            document.getElementById("saveLoadLabel").innerText="Game loaded"


        })
}

function saveGame(){
    let url =  "http://localhost:3000/"
    let datakey = 1234567890

    fetch(url + "api/data/" + datakey + "?api-key=c4game", { method: 'PUT',
        headers: { 'Content-type': 'application/json' }, body: JSON.stringify(state)
    })
    document.getElementById("saveLoadLabel").innerText="Game saved"
}

buildBoard()