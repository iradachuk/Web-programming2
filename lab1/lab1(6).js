// сортування бульбашкою масиву
module.exports.SortBuble = function (array, param) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (param === '>') {
                if (array[j] < array[j + 1]) {
                    let temp = array[j]
                    array[j] = array[j + 1]
                    array[j + 1] = temp
                }
            } else {
                if (array[j] > array[j + 1]) {
                    let temp = array[j]
                    array[j] = array[j + 1]
                    array[j + 1] = temp
                }
            }
        }
    }
    return array
}