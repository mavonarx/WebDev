function fib(n){
    const GoldenRatio = (1 + Math.sqrt(5))/2
    return Math.round((GoldenRatio ** n)/Math.sqrt(5))
}

console.log(fib(0))

