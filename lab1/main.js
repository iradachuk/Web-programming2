'use strict'
//Variant №3
console.log('lab1', '\n')
let Item_1 = require('./lab1(1).js')
let Item_2 = require('./lab1(2).js')
let Item_3 = require('./lab1(3).js')
let Item_4 = require('./lab1(4).js')
let Item_5 = require('./lab1(5).js')
let Item_6 = require('./lab1(6).js')
let PerformerClass = require('./Performer.js')
let CustomerClass = require('./Customer.js')
let ProjectClass = require('./Project.js')


//Item 1
console.log('1. Реалізувати розбиття стрічки на слова у масив.')
let str = 'I am a student of NU LP'
console.log(str)
console.log(Item_1.strcut(str))
console.log('\n')


//Item 2
console.log('2. Написати функцію, яка поверне чи входить задана стрічка у задану.')
let array = 'I am a student of NU LP'
let subArray = 'I am studying programming'
let subArray1 = 'student of NU'
//Чи входить subArray в стрічку array
console.log('Current array: ', array)
console.log('String 1: ', subArray)
console.log('String 2: ', subArray1)
if(Item_2.isSubstring(subArray,array)){
    console.log('String 1 is included into current string')
} else{
    console.log('String 1 is not included into current string')
}
//Чи входить subArray1 в стрічку array
if(Item_2.isSubstring(subArray1,array)){
    console.log('String 2 is included into current string')
} else{
    console.log('String 2 is not included into current string')
}
console.log('\n')


//Item 3
console.log('3. Написати функцію, яка порахує факторіал натурального числа.')
let num1 = 6
let num2 = 1
let num3 = -2.25
console.log('Factorial ', num1, 'is', Item_3.factorial(num1))
console.log('Factorial ', num2, 'is', Item_3.factorial(num2))
console.log('Factorial ', num3, 'is', Item_3.factorial(num3) === undefined ? 'Error!' : Item_3.factorial(num3))
console.log('\n') 


//Item 4
console.log('4. Реалізувати алгоритм бінарного пошуку.')
let array1 = [-10, -2, 0, 6, 11, 17, 150]
let el1 = 11
let el2 = 125
console.log('Index of element', el1, 'is', Item_4.BinarySearch(0, array1.length - 1, el1, array1))
console.log('Index of element', el2, 'is', Item_4.BinarySearch(0, array1.length - 1, el2, array1))
console.log('\n')


//Item 5 
console.log('5. Написати функцію, яка знайде максимальну дату у масиві.')
let ArrayOfDate = ['2019-07-09', '2015-06-20', '2020-02-07', '2019-09-16', '2016-02-18']
console.log('Maximum date in array is', Item_5.maxDate(ArrayOfDate))
console.log('\n')


//Item 6
console.log('6. Написати реалізацію сортування бульбашкою масиву')
let arr1 = [14, -2, 190, -19, 0, 25, 3, 95] 
let arr2 = ['banana', 'mango', 'apple', 'apricot', 'pineapple']
console.log('Sorted array', Item_6.SortBuble(arr1, '>'))
console.log('Sorted array', Item_6.SortBuble(arr2, '<'))
console.log('\n')


//Item 7
let customer1 = new CustomerClass.Customer('Mark', 'Ubuntu')
customer1.AddCustomer()
let customer2 = new CustomerClass.Customer('Bill', 'Microsoft')
customer2.AddCustomer()

let performer1 = new PerformerClass.Performer('Ira', 15)
performer1.AddPerformer()
let performer2 = new PerformerClass.Performer('Oksana', 10)
performer2.AddPerformer()
let performer3 = new PerformerClass.Performer('Dzvina', 5)
performer3.AddPerformer()

let project1 = new ProjectClass.Project('Windows', 'programming')
let project2 = new ProjectClass.Project('Ubuntu', 'programming')
let project3 = new ProjectClass.Project('Windows', 'design')
let project4 = new ProjectClass.Project('Mac OS', 'design')
project4.AddProject()

performer1.AddProjectToPerformer(project2)
customer1.AddProjectToCustomer(project2)

performer2.AddProjectToPerformer(project1)
customer2.AddProjectToCustomer(project1)

performer3.AddProjectToPerformer(project3)
customer2.AddProjectToCustomer(project3)

customer1.EditCustomer('Marc', 'Libre Office')
performer3.EditPerformer('Oksana', 8)
project3.EditProject('Microsoft Office', 'design')

console.log('Projects of customer1')
customer1.SearchProjectOfCustomer()
console.log('\n')

console.log('Projects of customer2')
customer2.SearchProjectOfCustomer()
console.log('\n')

console.log('Projects of performer1')
performer1.SearchProjectOfPerformer()
console.log('\n')

console.log('Projects of performer2')
performer2.SearchProjectOfPerformer()
console.log('\n')

console.log('Projects of performer3')
performer3.SearchProjectOfPerformer()
console.log('\n')

console.log('Customers collection')
console.log(CustomerClass.CustomerCollection)
console.log('\n')

console.log('Performers collection')
console.log(PerformerClass.PerformerCollection)
console.log('\n')

console.log('Projects collection')
console.log(ProjectClass.ProjectCollection)
console.log('\n')