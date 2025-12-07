const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./router/user');
const { courseRouter } = require('./router/course')
const { adminRouter } = require('./router/admin')
const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);


async function main() {
    mongoose.connect("mongodb+srv://nucleus25:KK68nVPcUqC00zNG@cluster0.dbuq4aw.mongodb.net/course-selling-app")
    app.listen(3000);
    console.log("listening on port 3000");
}

main();