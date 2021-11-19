const Course = require('../models/course')
const multer = require('multer')
const sharp = require('sharp')

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

//video upload

exports.videoUpload = multer({
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video!!'))
    }
    cb(undefined, true)
  }
})

exports.course_videoUpload = async (req, res) => {
  try {
    const buffer_video = await sharp(req.file.buffer).toBuffer()
    req.course.video = buffer_video
    await req.course.save()
    res.json({
      success: true
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//file upload

exports.fileUpload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.pdf|ppt|odt|doc|docx/)) {
      return cb(new Error('Please upload a valid file!!'))
    }
    cb(undefined, true)
  }
})

exports.course_fileUpload = async (req, res) => {
  try {
    const buffer_file = await sharp(req.file.buffer_file).toBuffer()
    req.course.file = buffer_file
    await req.course.save()
    res.json({
      success: true
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

exports.getCourse = async (req,res) => {
    try{
        const getCourse = await Course.find({})
        if (!getCourse.length) {
            throw new Error('No Courses!')
           }
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

        if (!getCourseByOwner.lenght) {
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

exports.updateCourse = async (req, res) => {
  
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','descr','duration']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
  
    try {
      const course = await Course.findOneAndUpdate({_id: _id}, req.body, {new:true})
    
      if(!course){
        return res.status(404).send('Course not found')
     }
        
        res.json({
          success: true,
          data: course
        })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
  
    }
  }

exports.deleteCourse = async (req, res) => {
    const _id = req.params.id  
    try {
        const course = await Course.findOneAndDelete({_id:_id})
        if (!_id) {
          throw new Error('No Courses to delete!')
      }
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