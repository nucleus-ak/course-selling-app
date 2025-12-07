const express = require('express');
require('dotenv').config();
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
    mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000");
}

main();