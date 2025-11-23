const { Router } = require('express');

const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.json({
        msg: "Signup"
    });
});

adminRouter.post('/signin', (req, res) => {

});

adminRouter.post('/course' (req, res) = {

})

adminRouter.put('/course' (req, res) = {

})

adminRouter.get('/course/getbulk' (req, res) = {

})



module.exports = {
    adminRouter: adminRouter
}