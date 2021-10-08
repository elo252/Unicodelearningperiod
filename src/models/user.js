const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name']
  },


  mobile: {
    type:Number,
    unique: [true, 'Sorry, enter another mobile number, as already taken'],
    required: [true, 'Mobile Number'],
    minlength:10,
    maxlength:10

  },

  email: {
    type: String,
    unique: [true, 'Sorry, enter another Email, as already taken'],
    required: [true, 'Email id'],
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
    },role: {
    type: String,
    enum: ['Student', 'Teacher' ],
    
    required:[true,'Role must be defined']
  },  Enrolled: {
    type: [mongoose.Schema.Types.ObjectId],
    //required: true,
    ref: 'Course'
  },    course: {
  type: [String]
 },
  password: {
    type: String,
    required: [true, 'Password'],
    minLength: 8
  },
  

  
});


userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretkeyisunicode')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token

} 

userSchema.statics.findByCredentials = async function ( email, password ) {
  const user = await this.findOne({ email })

  if(!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

//hash the plaintext password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User