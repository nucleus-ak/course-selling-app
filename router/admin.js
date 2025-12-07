const { Router } = require('express');
const jwt = require('jsonwebtoken');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const { JWT_SECRET_ADMIN } = require('../config');
const { adminMiddleware } = require('../middleware/admin');


adminRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
        
    // TODO: Input validation using zod, storing hashed password
        
    await adminModel.create({
        email: email, 
        password: password, 
        firstName: firstName,
        lastName: lastName
    });

    res.json({
        msg: "Signup Succeeded"
    })
});

adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Todo: Compare with the hashed password (If previous TODO completed)
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if(admin) {
        const token = jwt.sign({
            id : admin._id
        }, JWT_SECRET_ADMIN);

        res.json({
            token: token    
        });
    } else {
        res.status(403).json({
            msg: "Invalid Creds"
        });
    }
});

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageURL, price } = req.body;
    const course = await courseModel.create({
        title,
        description,
        imageURL,
        price,
        creatorId: adminId
    })

    res.json({
        msg: "Course Created",
        courseId: course._id,
    })
})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageURL, price, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,      // Update this course
        creatorId: adminId  // Only if this admin created it
    },{
        title,
        description,
        imageURL,
        price,
    })
    
    // Current admin was not able to create the course
    if (course.matchedCount === 0) {
        return res.status(403).json({
            msg: "You are not allowed to update this course or course not found"
        });
    }
    res.json({
        msg: "Course Updated",
        courseId: course._id,
    })
})

adminRouter.get('/course/getbulk', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        courses
    });
})

module.exports = {
    adminRouter: adminRouter
}