//
//  nexttick vs. immediate and timeout events
//

const fs = require('fs')
const process = require('process')

fs.readFile("nexttick.js", () => {
  
  setTimeout(() => {
    console.log('3. timeout')
  }, 0)
  
  setImmediate(() => {
    console.log('2. immediate')
  })
  
  process.nextTick(() => {
    console.log('1. nexttick')
  })

})