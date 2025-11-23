const { Router } = require('express');

const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
})

courseRouter.get('/preview', (req, res) => {
    res.json({
        msg: "See"
    })
});


module.exports = {
    courseRouter: courseRouter
}