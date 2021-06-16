const utils = require('./utils')

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        age: '39'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        age: '17'
    },
    {
        firstName: 'Joe',
        lastName: 'Davis',
        age: '77'
    },
    {
        firstName: 'Jody',
        lastName: 'Davis',
        age: '5'
    },
]

// try to change getUserNames, generateUserList
utils.getUserNames = 'userName'
utils.generateUserList = 'userList'

console.log('User List: ', utils.generateUserList(users))
console.log('User Names: ', utils.getUserNames(users))