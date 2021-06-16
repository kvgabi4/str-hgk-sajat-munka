const generateUserList = (users) => {
    return users.map(user => [{ isAdult: user.age > 18 ? true : false, fullName: `${user.firstName} ${user.lastName}` }])
}

const getUserNames = (users) => {
    return users.reduce((acc, curr) => acc + `${curr.firstName} ${curr.lastName}, `, '')
}
// with Object.freeze()
module.exports = Object.freeze({
    generateUserList,
    getUserNames
})

// without Object.freeze()
// module.exports = {
//     generateUserList,
//     getUserNames
//   }
