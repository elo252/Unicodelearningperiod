const Course = require('../models/course')
exports.createCourse = async (req, res) => {
    const course = new Course(req.body)
  
    try {
      await course.save()
      res.status(201).json({
        success: true,
        data: course
      })
    }catch(e){
      res.status(400).json({
        success: false,
        message: e.message
      })
    }
}
exports.getCourse = async (req,res) => {
    try{
        const getCourse = await Course.find({})
        
        res.json({
            success: true,
            data: getCourse
           
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getCoursebByOwner = async (req,res) => {
    try{
        const getCourseByOwner = await Course.find({owner: req.params.owner})

        if (getCourseByOwner.lenght) {
            throw new Error('Course not found');
           }

        res.json({
            success: true,
            data: getCourseByOwner
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getCourseByName = async (req,res) => {
    try{
        const getCourseByName = await Course.find({name: req.params.name})

        if (!getCourseByName.lenght) {
            throw new Error('Course not found');
           }

        res.json({
            success: true,
            data: getCourseByName
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      await req.course.remove()
      res.json({
        success: true,
        data: req.course
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
    }
}