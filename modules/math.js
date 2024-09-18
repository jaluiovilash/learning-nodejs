function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// multi export
module.exports = {
    add,
    sub,
}

// another way to export a single line fns
// below fns are anonymous fns
exports.addFn = (a, b) => a + b;
exports.subFn = (a, b) => a - b;