exports.rnadomInt = function rnadomInt(max, min = 0) {
    const range = max - min;
    return Math.floor(Math.random() * range + min);
}

exports.squareDistantce = function squareDistantce(first, second) {
    const x = first.x - second.x;
    const y = first.y - second.y;

    return x * x + y * y;
}

exports.manhetanDistantce = function manhetanDistantce(first, second) {
    const x = first.x - second.x;
    const y = first.y - second.y;

    return x + y;
}

exports.makeArray = function makeArray(length) {
    return Array.from({length})
} 