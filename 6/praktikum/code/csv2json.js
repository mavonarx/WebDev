const fs = require('fs')

csvFile = process.argv[2]
jsonFile = process.argv[3]


let x = new Date().getTime()
data = fs.readFileSync(csvFile,'utf8')
let y = new Date().getTime()
let time = y-x

lines = data.split("\n")
numberOfLines = lines.length

let jsonObject = {}


names = lines[0].split(",")
jsonObject.arr = []
for (let i =1; i<lines.length; i++){
    jsonObject.arr[i]={}
    let j = 0
    entries = lines[i].split(",")
    for (let name of names){
      //  jsonObject.arr[i][`${name}`] = {}
        jsonObject.arr[i][name] = entries[j]
        j++
    }
}
writeObject = JSON.stringify(jsonObject,null,4)

fs.writeFile(jsonFile,writeObject,(err)=>{
    if (err){
        console.log(err)
    }

})










