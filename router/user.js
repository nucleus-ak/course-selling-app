const { Router } = require('express');
const { userModel } = require('../db');
const { JWT_SECRET_USER } = require('../config');
const jwt = require('jsonwebtoken');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    // TODO: Input validation using zod, storing hashed password
    
    await userModel.create({
        email: email, 
        password: password, 
        firstName: firstName,
        lastName: lastName
    });

    res.json({
        msg: "Signup Succeeded"
    })
});

userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Todo: Compare with the hashed password (If previous TODO completed)
    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if(user) {
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET_USER);

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            msg: "Invalid Creds"
        });
    }

});

userRouter.get('/purchases', (req, res) => {

});

module.exports = {
    userRouter: userRouter
}