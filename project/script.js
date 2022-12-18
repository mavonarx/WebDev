import { render } from "./lib/suiweb.js"

const COLUMNS = 7
const ROWS = 6

let stateArray = []
const colorMap= {
    "":"",
    "b":"blue",
    "r":"red"
}

let state = {}
state.board= Array(ROWS).fill('').map(() => Array(COLUMNS).fill(''));
state.blue=true;
state.color = "b"
state.winner = null;


const App = () => [Board, {board: state.board}]

const Board = ({board}) => {
    let fields = []
    for (let row=0; row<ROWS; row++){
        for (let col=0; col<COLUMNS; col++){
            let type = board[row][col]
            fields.push([Field,{type,row,col}])
        }
    }
    return (
        ["div", {className: "board"}, ...fields] )
}

const Field = ({type,row,col})=> {
    if (type === ''){
        return ["div", {className:"field", "gridRow":`${row}`, "gridColumn":`${col}`}]
    }
    let child = ["div", {className:`piece ${colorMap[type]}`}]
    return ["div", {className:"field", "gridRow":`${row}`, "gridColumn":`${col}`},child]
}

const Label = ({winner, color})=>{
    color = color.toUpperCase()+ colorMap[color].slice(1)
    if (winner!=null){
        return ["label",`${color} wins!`]
    }
    else {
        return ["label", `${color}'s turn`]
    }
}

function setInObj(obj, attr, val){
    let newObj = {}
    for (let i in obj){
        if (i === attr){
            newObj[i]=val
        }
        else {
            newObj[i]=obj[i]
        }
    }
    return newObj
}

function lowestColumnEmptySpot(col){
    for (let row = ROWS-1; row>=0; row-- ){
        if (state.board[row][col]===''){
            return row
        }
    }
    return ROWS
}

function checkWin(symbol,board){

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
            if (board[row][col]===symbol){
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
            if (board[row][col]===symbol){
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
            if (board[row][col]===symbol){
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

function undo() {
    if (stateArray.length===0){
        return
    }
    state = JSON.parse(stateArray.pop());
    showBoard()
}

function showBoard () {
    const app = document.querySelector(".app")
    render([App], app)
    addListeners()
    updateLabels(state.winner,state.color)
    if (state.winner){
        document.getElementById("restartGame").style.animation="blink 1000ms infinite"
    }
    else{
        document.getElementById("restartGame").style.animation="none"
    }
    return app
}

function updateLabels(winner,color){
    const label = document.querySelector(".infoLabel")
    render([Label,{winner,color}],label)
    label.style.color = colorMap[state.color]
}

function addListeners(){
    let fields = document.querySelectorAll(".field")

    for (let f of fields){
        f.addEventListener("click", () =>{
            stateArray.push(JSON.stringify(state))
            if (state.winner){
                return
            }
            let currentCol = f.gridColumn
            let lowerSpot = lowestColumnEmptySpot(currentCol)
            if (lowerSpot>=ROWS){
                return
            }
            state.board[lowerSpot][currentCol]=state.color
            checkWin(state.color,state.board)
            if(!state.winner){
                state = setInObj(state, "color",state.color==="b"?"r":"b")
            }
            showBoard()
        })
    }
}


function restartGame(){
    stateArray.push(JSON.stringify(state)) // with that also a accidental push to the nre game button can be reverted
    state.board= Array(ROWS).fill('').map(() => Array(COLUMNS).fill(''))
    state.color="b"
    state.winner = null
    state.winner=null
    showBoard()
}

function loadLocal(){
    if (localStorage.getItem("state")){
        state =  JSON.parse(localStorage.getItem("state"))
        showBoard()
    }
}

function storeLocal(){
    localStorage.setItem("state",JSON.stringify(state))
}

document.querySelector("#storeLocal").addEventListener("click", storeLocal)
document.querySelector("#loadLocal").addEventListener("click", loadLocal)
document.querySelector("#loadGame").addEventListener("click", loadGame)
document.querySelector("#saveGame").addEventListener("click", saveGame)
document.querySelector("#restartGame").addEventListener("click", restartGame)
document.querySelector("#undo").addEventListener("click", undo)


showBoard()