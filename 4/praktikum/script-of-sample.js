function scriptOfSample(char,array){
    let code = char.codePointAt(0)
    for (const object of array){
        ranges = object.ranges
        for (const range of ranges){
            if (code >= range[0] && code < range[1]){
                return object.name
            }
        }
    }
    return "unknown"
}

module.exports = { scriptOfSample }