const COLUMNS = 7
const ROWS = 6

let state = Array(6).fill('').map(() => Array(7).fill(''))

function buildRandomBoard() {
    const board = document.querySelector(".board")
    board.style.gridTemplateRows=`repeat(${ROWS},12vw)`
    board.style.gridTemplateColumns=`repeat(${COLUMNS},12vw)`
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            let node = []
            if (Math.random()<0.3){
                node.push(elt("div",{class:"blue piece"}))
                state[row][col]='b'
            }
            else if (Math.random()<0.3){
                node.push(elt("div", {class:"red piece"}))
                state[row][col]='r'
            }
            let field = elt("div", {class: "field", gridRow:row, gridColumn:col},...node)
            board.appendChild(field)
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

function intervall() {
    setInterval(
        () => {

                let curRow = Math.floor(Math.random() * ROWS);
                let curCol = Math.floor(Math.random() * COLUMNS);
                let random = Math.floor(Math.random() * 3);
                    if (random === 1) {
                        if (state[curRow][curCol]==='b') {
                            if (Math.random()<0.5){
                                state[curRow][curCol] = 'r'
                            }
                            else state[curRow][curCol] = ''
                        }
                    } else if (random === 2) {
                        if (state[curRow][curCol]==='r') {
                            if (Math.random()<0.5){
                                state[curRow][curCol] = 'b'
                            }
                            else state[curRow][curCol] = ''
                        }
                    } else {
                        if (state[curRow][curCol]==='') {
                            if (Math.random()<0.5){
                                state[curRow][curCol] = 'r'
                            }
                            else state[curRow][curCol] = 'b'
                        }
                    }
            showBoard()
        }, 1000)
}

function removeAllFields(){
    const board = document.querySelector(".board");
    for (let i = 0; i<board.children.length;){
        board.removeChild(board.firstChild);
    }
}

function removeAllNodes(){
    const board = document.querySelector(".board");
    for (let field of board.children){
        if (field.firstChild) {
            field.removeChild(field.firstChild)
        }

    }

}

buildRandomBoard()
//removeAllNodes()
intervall()