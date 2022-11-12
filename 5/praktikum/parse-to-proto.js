const parseToProto = function(json, proto) {
    let obj = JSON.parse(json)
    Object.setPrototypeOf(obj,proto)
    return obj
}
module.exports = {parseToProto}