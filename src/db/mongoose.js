const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


let db

if (process.env.ENVIRONMENT === 'production') {
  console.log("Env Changed to Prod")
    db = process.env.DB;
} else if (process.env.ENVIRONMENT === 'test') {
    db = process.env.DBT;
    console.log("Env Changed to Test")
}



mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));