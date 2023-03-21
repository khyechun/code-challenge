var sum_to_n_a = function (n) {
    // your code here
    let sum = 0

    for (let i = 1; i < n + 1; i++) {
        sum += i
    }

    return sum
};

var sum_to_n_b = function (n) {
    // your code here
    if (n == 0) {
        return n
    }
    return n + sum_to_n_b(n - 1)
};

var sum_to_n_c = function (n) {
    // your code here
    return (n / 2) * (n + 1)
};

console.log("5",sum_to_n_a(5))
console.log("10",sum_to_n_a(10))


console.log("5",sum_to_n_b(5))
console.log("10",sum_to_n_b(10))


console.log("5",sum_to_n_a(5))
console.log("10",sum_to_n_b(10))