
const Student = require('../models/user')



exports.createStudent = async (req, res) => {
    const student = new Student(req.body)
  
    try {
      await student.save()
      res.status(201).json({
        success: true,
        data: student
      })
    }catch(e){
      res.status(400).json({
        success: false,
        message: e.message
      })
    }
}


exports.getUsers = async (req,res) => {
  try{
      const getUser = await Student.find({})
      
      res.json({
          success: true,
          data: getUser
         
      })
  } catch(e) {
      res.status(400).json({
          success: false,
          message: e.message
      })
  }
}

exports.enrollCourse = async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['Enrolled']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const student = await Student.findOneAndUpdate({_id: _id}, req.body, {new:true})

    if(!student){
      return res.status(404).send()
   }
      
      res.json({
        success: true,
        data: student
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })

  }
}

exports.deleteStudent = async (req, res) => {
  const _id = req.params.id  
  try {
      const student = await Student.findOneAndDelete({id : _id})
      res.json({
        success: true,
        data: student
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
    }
}

const Teacher = require('../models/user')

exports.createTeacher = async (req, res) => {
    const teacher = new Teacher(req.body)
  
    try {
      await teacher.save()
      res.status(201).json({
        success: true,
        data: teacher
      })
    }catch(e){
      res.status(400).json({
        success: false,
        message: e.message
      })
    }
}

exports.deleteTeacher = async (req, res) => {
  const teacher = await Teacher.findOneAndDelete({id : _id})  
  try {
      
      res.json({
        success: true,
        data: teacher
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
    }
}

// exports.login = async (req, res) => {
//   try {
// user = Users.findByID(req.body.email)
//    If(user=="student"){
// //Return student 
// } else {
// // Return teacher 
// }
//   }catch(e){
//     res.status(400).json({
//       success: false,
//       message: e.message
//     })
//   }
// }

// 
// If(req.body.role=="student"){
// //Do student ke tasks
// }Else{
// //Do teacher ke tasks
// }