import { render } from "./lib/suiweb.js"

const COLUMNS = 7
const ROWS = 6

let stateArray = []
const colormap= {
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
    let child = ["div", {className:`piece ${colormap[type]}`}]
    return ["div", {className:"field", "gridRow":`${row}`, "gridColumn":`${col}`},child]
}

const Label = ({winner, color})=>{
    if (winner!=null){
        return ["label",`${color} wins!`]
    }
    else {
        return ["label", `${color}'s turn`]
    }
}



function buildBoard() {
    showBoard()
    document.getElementById("infoLabel").innerText="Blue's Turn"
    document.getElementById("infoLabel").style.color="blue"
}


function setInList(lst, idx, val){
    let newList = []
    for (let i in lst){
        if (i ===idx){
            newList[i]=val
        }
        else {
            newList[i]=lst
        }
    }
    return newList

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
    updateLabels()
    return app
}

function updateLabels(){
    const label = document.querySelector(".infoLabel")
}

function addListeners(){
    let fields = document.querySelectorAll(".field")

    for (let f of fields){
        f.addEventListener("click", () =>{
            stateArray.push(JSON.stringify(state))
            if (state.winner!=null){
                return
            }
            let currentCol = f.gridColumn
            let lowerSpot = lowestColumnEmptySpot(currentCol)
            if (lowerSpot>=ROWS){
                return
            }
            state.board[lowerSpot][currentCol]=state.color
            //let symbol = state.blue===true ? 'b':'r'
            checkWin(state.color,state.board)
            if(state.winner!==null){
                displayWinner()
                return;
            }
            state = setInObj(state, "color",state.color==="b"?"r":"b")

            let className = ""
            if (state.color==="b"){
                className = "Blue"
            }
            else{
                className = "Red"
            }
            showBoard()
            //set loadlabel to empty
            document.getElementById("saveLoadLabel").innerText=""
            document.getElementById("infoLabel").innerText=`${colormap[state.color]}'s Turn`
            // set the color of the label to the color of the next player
            document.getElementById("infoLabel").style.color = colormap[state.color]

        })
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
    showBoard()

    document.getElementById("infoLabel").innerText=`${winner} Wins!`
    document.getElementById("restartGame").style.animation="blink 1300ms infinite"
}


function restartGame(){
    stateArray=[]
    document.getElementById("restartGame").style.animation="none"
    const board = document.querySelector(".board");
    state.board= Array(ROWS).fill('').map(() => Array(COLUMNS).fill(''));
    state.color="b";
    state.winner = null;
    showBoard()
    document.getElementById("infoLabel").innerText="Blue's Turn"
    document.getElementById("infoLabel").style.color="blue"

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
            if (data.winner===null){
                document.getElementById("newGame").style.animation="none"
            }
            else {
                displayWinner()
            }
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

function loadLocal(){
   state =  JSON.parse(localStorage.getItem("state"))
    showBoard()
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
buildBoard()