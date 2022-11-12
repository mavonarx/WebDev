const equal = function(a,b){

    if (a===b){
        return true
    }
    if ("number" === typeof a && "number" === typeof b){
        return a===b;
    }


    for (let key in a){
        if(a[key]!==b[key]){
            return false
        }
    }

    for (let key in b){
        if(b[key]!==a[key]){
            return false
        }
    }

    return true



}

module.exports = {equal}
