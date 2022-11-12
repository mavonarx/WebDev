const assert = require("assert");
function power(b,n) {

    assert.ok(!(n<0),'the value is negative')
    assert.ok(Number.isInteger(n), 'the exponent is not an integer')
    assert.ok(Number.isInteger(b), 'the exponent is not an integer')
    //assert.ok(typeof(b)==='number', 'the base is not of type number')

    if (n == 0){
        return 1
    }
    if (n%2 ==0){
        return (power(b,n/2)) **2
    }
    else{
        return b * power(b,n-1)
    }
}
console.log(power(2,4))

module.exports = { power }
