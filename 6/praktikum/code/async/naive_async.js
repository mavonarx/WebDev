//
//  Naive asynchronous code. This doesn’t work!
//
let fs = require('fs')
let timestamp = new Date().toString()
let contents

fs.writeFile('date.txt', timestamp, () => {})

fs.readFile('date.txt', (err, data) => { 
	if (err) throw err
	contents = data
	console.assert(timestamp == contents)
})

console.log('Comparing the contents')