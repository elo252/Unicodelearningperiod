const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Course = require('../../src/models/course.js')
const user_id = new mongoose.Types.ObjectId()
const course_id = new mongoose.Types.ObjectId()
const dotenv = require('dotenv')
dotenv.config()

const userTest = {
    _id: user_id,
    name: 'qwwe',
    email: 'qwe@gmail.com',
    password: 'qwertyuiop',
    role: 'Teacher',
    token: jwt.sign({ _id: user_id.toString() }, process.env.TOKEN)
}

const courseTest = {
    _id: course_id,
    name: 'zxcv',
    descr:'cvbn',
    duration:60,
    owner:'trtyu'

}

const dbReq = async () => {
    await User.deleteMany()
    await Course.deleteMany()
    await new User(userTest).save()
    await new Course(courseTest).save()
}

module.exports = {
    userTest,
    courseTest,
    dbReq
}