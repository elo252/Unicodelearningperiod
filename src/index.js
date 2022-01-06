const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const courseRouter = require('./routers/course')
const morgan = require('morgan');

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'));
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)

const ser = app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

module.exports = ser