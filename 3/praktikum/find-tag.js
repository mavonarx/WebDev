
const findTag = function (text){
    out = ''
    for (let i = 0; i<text.length; i++){

        if (text[i]==='<'){
            for (let j = 1 ; j+i<text.length; j++){
                if(text[i+j]===' '){
                    out = ''
                    break
                }

                if(text[i+j]==='<'){
                    out = ''
                    continue
                }

                if(text[i+j]==='>'){
                    return out
                }

                out+=text[i+j]
            }
        }
    }
}

module.exports = {findTag}