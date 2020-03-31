const {User} = require('../../models')

function isFirstAndLastNameExist(firstName, lastName) {
    let isUserExist = false;
    User.items.forEach((u) =>{
        if(u.firstName === firstName && u.lastName === lastName){
            isUserExist = true;
        }
    })
    return isUserExist;
}

module.exports = {
    isFirstAndLastNameExist
}
