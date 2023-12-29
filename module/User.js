const usercollection = require('../db');
const validator = require('validator');
const bcrypt = require('bcryptjs');
let User = function(data){
    this.data = data;
    this.errors = [];
}


// this is attempting to login (that is to check if the username and password are correct)

// this is login prototype method


// this code is used to cleanup the registations form
User.prototype.cleanup = function(){
    if (typeof(this.data.user)!= "string") {this.data.user = ""}
    if (typeof(this.data.name)!= "string") {this.data.name = ""}
    if (typeof(this.data.other)!= "string") {this.data.other =""}
    if (typeof(this.data.password)!= "string") {this.data.password = ""}

    // get rid of any bogus properties
  this.data = {
    user: this.data.user.trim().toLowerCase(),
    name: this.data.name.trim().toLowerCase(),
    other: this.data.other.trim().toLowerCase(),
    password: this.data.password
  }
  
  
}

// the bellow code is use to validate the registration process
User.prototype.validate =  function(){
    if (this.data.user == "") { this.errors.push("You must provide a username.");}
    if (this.data.user!= "" && !validator.isAlphanumeric(this.data.user)) {this.errors.push("Username can only contain letters and numbers.");
    if (this.data.name == "") {this.errors.push("You must provvide your name.");}
    if (this.data.other == "") {this.errors.push("You must provide your name.");}
    if (this.data.password == "") {this.errors.push("You must provide a password.");}
    if (this.data.user.length > 0 && this.data.user.length < 3) { this.errors.push("username must be at least 3 characters.");}
    if (this.data.user.length > 30) {this.errors.push("username must not exceed more than 30 characters.");}
    if (this.data.password.length > 0 && this.data.password.length < 8) {this.errors.push("Password must be at least 8 characters.");}
    if (this.data.password.length > 100) {this.errors.push("Password must not exceed more than 100 characters.");}
}
}

// inserting data to mongodb database 
User.prototype.insertData = async function(){
    let salt = bcrypt.genSaltSync(10)
    this.data.password = bcrypt.hashSync(this.data.password, salt)
    let database = await usercollection.getDatabase();
    let collection = database.collection("registration");
   await collection.insertOne(this.data)
}

User.prototype.login =  function(){
    return new Promise( async (resolve, reject) =>{
       await this.cleanup();
// cheking if the username and password are correct
    
let database = await usercollection.getDatabase();
let collection = database.collection("registration");
await collection.findOne({user: this.data.user})
.then((attemptedUser)=> {
    if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password) ) {
        resolve('congrats!') 
    }else{
        reject("Invalid username / password.")
    }
}).catch((err)=> {
    reject("Please try again later.")
})
    });
   
    
    
    }

    // this is logout method
    // User.prototype.logout = function() {
    
    // }
    
// this is form registration prototype method 
User.prototype.register = function(){
    this.cleanup();
    this.validate();

if(!this.errors.length){

    this.insertData()
}

    
       

}

// this is my home prototype method
User.prototype.home = function() {

};

module.exports = User;