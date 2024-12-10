// imports the mongoose library to interact with a MongoDB database using object orientation model
const mongoose = require('mongoose');
//imports bcrypt for hashing passwords
const bcrypt = require('bcrypt');
//imports validator, a library used to validate strings
const validator = require('validator');

//creates a reference to mongoose.Schema, which is used to define the structure of 
//MongoDB documents
const Schema = mongoose.Schema;

//defines the user schema
const userSchema = new Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    fName:{
        type: 'string',
        required: true
    },
    lName:{
        type: 'string',
        required: true
    }
})

//defines a static method
//static methods are called on the model itself, not an instance of the model
userSchema.statics.signup = async function (email, password, fName, lName) {
    //check if a user has provided signup details
    if (!email || !password || !fName || !lName) {
        throw Error('all fields must be filled in');
    }
    // check if an email is valid
    if (!validator.isEmail(email)) {
        throw Error('email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('password is not strong enough');
    }

    //checks for existing user
    const exists = await this.findOne({email});
    // if the email is already in use, throw an error
    if (exists) {
        throw Error('email already associated with an account');
    }

    // hashing the password using bcrypt
    // generates a salt, which is a random string used to make password hashing more secure,
    // the 10 referes to the cost of the factor (higher means more secure, but slower)
    const salt = await bcrypt.genSalt(10);
    // hashes the password using generated salt, the resulting hash is stored of instead of the plain password
    const hash = await bcrypt.hash(password, salt);

    // creates a new user in the database with email, and hashed password
    const user = await this.create({email, password: hash, fName, lName});
    // returns the newly created user object
    return user;
}

userSchema.statics.login = async function (email, password) {
    // check if user has any missing fields
    if (!email || !password) {
        throw Error('All feilds must be filled');
    }
    // check if user exists
    const user = await this.findOne({email});

    if (!user) {
        throw Error('email is not recognized');
    }

    //check if password is associated with user
    const match = await bcrypt(password, user.password);

    //if password is not associated with user, throw an error
    if (!match) {
        throw Error('password is not associated with user');
    }

    return user;
}

module.exports = mongoose.model('user', userSchema);