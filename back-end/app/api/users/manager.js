const {User} = require('../../models')

function isFirstAndLastNameExist(firstName, lastName) {
    let isUserExist = false;
    User.items.forEach((u) =>{
        if(getCorrectFormatString(u.firstName.toLowerCase()) === getCorrectFormatString(firstName.toLowerCase())
            && getCorrectFormatString(u.lastName.toLowerCase()) === getCorrectFormatString(lastName.toLowerCase())){
            isUserExist = true;
        }
    })
    return isUserExist;
}

getCorrectFormatString = (s) => {
    console.log(s);
    s = s.trim();
    console.log(s);
    let regex = /[\n\r\s\t]+/g;
    console.log(s.replace(regex, ' '));

    return s.replace(regex, ' ');
}

getUserByUsername = (username) => {
    return User.get().find((u) => getCorrectFormatString(u.username.toLowerCase()) === getCorrectFormatString(username.toLowerCase()));
}

module.exports = {
    isFirstAndLastNameExist,
    getCorrectFormatString,
    getUserByUsername
}

