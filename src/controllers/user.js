
const User = require('../models/user')



exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)

    const token = await user.generateAuthToken()
  
    
      await user.save()
      res.status(201).json({
        success: true,
        data: user, token
      })
    }catch(e){
      res.status(400).json({
        success: false,
        message: e.message
      })
    }
}

exports.loginUser = async (req, res) => {
  try{
    

    const user = await User.findByCredentials(req.body.email, req.body.password)

    const token = await user.generateAuthToken()

    res.status(201).json({
      success: true,
      data: user, token
    })

  } catch(e){
    console.log(e)
    res.status(400).json({
      success: false
    })
  }
}

exports.logoutUser = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
} catch (e) {
    res.status(500).send()
}

}

exports.getUsers = async (req,res) => {
  try{
      const getUser = await User.find({})
      if (!getUser.length) {
        throw new Error('No users!')
       }
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

exports.getStudents = async (req, res) => {
  try{
    const getStudents = await User.find({role: 'Student'}).populate('Enrolled')
    if (!getStudents.length) {
      throw new Error('No users!')
     }
    res.json({
        success: true,
        data: getStudents
       
    })
} catch(e) {
    res.status(400).json({
        success: false,
        message: e.message
    })
}
}

exports.getTeachers = async (req, res) => {
  try{
    const getTeachers = await User.find({role: 'Teacher'}).populate('owner')
    if (!getTeachers.length) {
      throw new Error('No users!')
     }
    res.json({
        success: true,
        data: getTeachers
       
    })
} catch(e) {
    res.status(400).json({
        success: false,
        message: e.message
    })
}
}

exports.updateUser = async (req, res) => {
  
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['mobile']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOneAndUpdate({_id: _id}, req.body, {new:true})
  
    if(!user){
      return res.status(404).send('User not found')
   }
      
      res.json({
        success: true,
        data: User
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })

  }
}

exports.enrollCourse = async (req, res) => {
  //if else for Student Or post login
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['Enrolled']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOneAndUpdate({_id: _id}, req.body, {new:true})
    // const user = await User.findOneAndUpdate({role: 'Student'}, req.body, {new:true})
    if(!user){
      return res.status(404).send()
   }
      
      res.json({
        success: true,
        data: User
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })

  }
}

exports.deleteUser = async (req, res) => {
  const _id = req.params.id  
  try {
      const user = await User.findOneAndDelete({_id:_id})
      if (!_id) {
        throw new Error('No users to delete!');
    }
      res.json({
        success: true,
        data: req.user
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
//    If(user=="Student"){
// //Return User 
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
// If(req.body.role=="Student"){
// //Do Student ke tasks
// }Else{
// //Do teacher ke tasks
// }