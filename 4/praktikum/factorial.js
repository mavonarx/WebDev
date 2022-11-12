function factorial(x) {

    if (typeof x === "bigint"){
        let out =1n;
        for (let i =2n; i<=x; i++){
            out *= i;
        }
        return out;
    }


    else
    {
        let out = 1;
        for (let i = 2; i <= x; i++) {
            out *= i;
        }
        return out;
    }
}

module.exports = { factorial }