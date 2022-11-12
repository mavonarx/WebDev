require('./scripts.js')

function oldAndLiving(SCRIPTS){
    const out = Array();
    for (const element in SCRIPTS){
        if (SCRIPTS[element].year <0 && SCRIPTS[element].living ===true){
            out.push(SCRIPTS[element].name)
        }
    }
    return out
}

function oldAndLiving2(SCRIPTS){
    return SCRIPTS.filter(element => element.living===true).filter(element => element.year <0).map(e => e.name)
}

//console.log(oldAndLiving(SCRIPTS))
//console.log(22222222)
//console.log(oldAndLiving2(SCRIPTS))


function numberOfCodes(object){
    return object.ranges.reduce((curr, [from, to]) => curr+to-from, 0)
}

console.log(numberOfCodes(SCRIPTS[3]))