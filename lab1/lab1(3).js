// функція, яка порахує факторіал натурального числа
let factorial =  function (n) {
    if((n ^ 0) === n && n >= 0) {
        return n <= 1 ? n : n * this.factorial(n - 1)
    }
}
module.exports = { factorial } 