https = require('node:https')

let Ort = process.argv.slice(2);

function currentTemp(Ort){
    httpsObject = https.get(`https://wttr.in/${Ort}?format=j1`, (resp) =>{
        let data = ''
        resp.on('data', (chunk) =>{
           data +=chunk;
        })
       resp.on('end',() => {
           data = JSON.parse(data)
           return console.log(data.current_condition[0].temp_C)

       })
    })
}

currentTemp(Ort);