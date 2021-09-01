const mongoose = require('mongoose')


const db = "mongodb+srv://user-ojasy:goaldiggers2020@cluster0.btfod.mongodb.net/UnicodeTask5?retryWrites=true&w=majority"
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));