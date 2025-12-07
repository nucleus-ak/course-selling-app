const { Router } = require('express');
const { purchaseModel, courseModel } = require('../db');
const courseRouter = Router();
const { userMiddleware } = require('../middleware/user');

courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    // TODO: Add a check that whether the user has already bought the course
    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        msg: "You have successfully purchased the course"
    });
})

courseRouter.get('/preview', async (req, res) => {
    const allCoursess = await courseModel.find({});
    res.json({
        allCoursess
    });
});


module.exports = {
    courseRouter: courseRouter
}