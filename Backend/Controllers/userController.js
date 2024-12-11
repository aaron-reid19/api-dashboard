const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '1d' })
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.status(200).json({email, token})
    }
    catch (error){
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const {email, password, fName, lName} = req.body;

    try {
        const user = await User.signup(email, password, fName, lName)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch (error) {
        res.status(400).json({error: error});
    }

}

module.exports = {signupUser, loginUser}