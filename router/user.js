const { Router } = require('express');
const { userModel, purchaseModel, courseModel } = require('../db');
const { JWT_SECRET_USER } = require('../config');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('../middleware/user');

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

userRouter.get('/purchases', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    });
    
    const courseData = await courseModel.find({
        _id: { $in : purchases.map(x => x.courseId)}
    });
    
    res.json({
        purchases,
        courseData
    });
});

module.exports = {
    userRouter: userRouter
}