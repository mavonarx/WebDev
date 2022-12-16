function renderSjdon(element, appRoot){
    while (appRoot.firstChild){
        appRoot.removeChild(appRoot.firstChild)
    }
    appRoot.appendChild(render(element))
}

function render(element){
    let node = document.createElement(element[0])
    for (let i =1; i<element.length; i++){
        if (Array.isArray(element[i])){
            node.appendChild(render(element[i]))
        }
        else if (typeof element[i]== 'string'){
            node.innerHTML = element[i]
        }
        else {
            for (let a in element[i]){
                node.setAttribute(a,element[i][a])
            }
        }
    }
    return node
}