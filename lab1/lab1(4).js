// алгоритм бінарного пошуку
let BinarySearch = function (first, last, item, array) {
    if (array[first] !== undefined && array[last] !== undefined && first <= last) {
        let middle = Math.floor((first + last) / 2)
        if (first === last && array[first] === item) {
            return first
        }
        if (last - first === 1) {
            if (array[first] === item) {
                return first
            } else if (array[last] === item) {
                return last
            } else {
                return undefined
            }
        } else {
            if (array[middle] === item) {
                return middle
            } else if (array[middle] > item) {
                return BinarySearch(first, middle - 1, item, array)
            } else if (array[middle] < item) {
                return BinarySearch(middle + 1, last, item, array)
            }
        }
    }
}
module.exports = { BinarySearch }