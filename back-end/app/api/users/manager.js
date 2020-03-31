const {User} = require('../../models')

function isFirstAndLastNameExist(firstName, lastName) {
    let isUserExist = false;
    User.items.forEach((u) =>{
        if(u.firstName.toLowerCase() === firstName.toLowerCase() && u.lastName.toLowerCase() === lastName.toLowerCase()){
            isUserExist = true;
        }
    })
    return isUserExist;
}

module.exports = {
    isFirstAndLastNameExist
}
