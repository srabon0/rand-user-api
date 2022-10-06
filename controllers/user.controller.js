const fs = require('fs');
var path = require('path');

const getUserData = () => {
    const jsonData = fs.readFileSync('./users.json');
    return JSON.parse(jsonData);    
}
/**
 * save user data 
 *  
 */
 const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}
/**
 * GET ALL USERS
 * @api  sends all users data 
 * @api  sucess all user data
 */
module.exports.getAllUser = (req,res)=>{
    const allUsers = getUserData();
    res.status(200).send(allUsers);
}
/**
 * GET A RANDOM USER
 * @api  servers a random user data 
 * @api success send a user data
 */
module.exports.getARandomUser = (req,res)=>{
    const jsonData = fs.readFileSync('./users.json');
    const allUsersData = JSON.parse(jsonData);
    const randomUserId = Math.floor(Math.random() * (allUsersData.length-1)) + 1;
    const singleUser =  allUsersData.find(person=>person.id == randomUserId)
     res.send(singleUser);
}
/**
 * Delete a single user from the list
 */
module.exports.deleteSpecificUser =  (req,res)=>{
    const jsonData = fs.readFileSync('./users.json');
    const allUsersData = JSON.parse(jsonData);
    const delUserId = req.body
    console.log(delUserId);
    console.log("Deleteing ,", delUserId);
    const index = allUsersData.findIndex(obj => obj.id == delUserId.id);
    console.log(index);
    if(index){
        console.log("ENter")
        allUsersData.splice(index,1);
        saveUserData(allUsersData);
        res.send(allUsersData);
    }else{
        res.send("Operation is not suceessfull. Maybe Id is not valid");
    }
        
}
/**
 *Update a single user from the list
 */
module.exports.updateUser =  (req,res)=>{
    const jsonData = fs.readFileSync('./users.json');
    const allUsersData = JSON.parse(jsonData);
    const updateUserId = req.body
    console.log(updateUserId);
    console.log("Update,", updateUserId);
    const index = allUsersData.findIndex(obj => obj.id == updateUserId.id);
    if(index){
        const singleUser = (allUsersData[index]);
        Object.keys(singleUser).forEach(key => {
            if(updateUserId[key]){
                singleUser[key] = updateUserId[key];
            }
           });
        res.send(allUsersData);
    }else{
        res.send("Operation is not suceessfull. Maybe Id is not valid");
    }
        
}

module.exports.saveUser = (req,res)=>{
    const jsonData = fs.readFileSync('./users.json');
    const allUsersData = JSON.parse(jsonData);
    console.log(req.body);
    const newUser = req.body;
    newUser.id = allUsersData.length;
    allUsersData.push(newUser);
    saveUserData(allUsersData);
    res.redirect('/user/all');
}
// module.exports = {
//     getAllUser,
//     getASpecificUser,
// }