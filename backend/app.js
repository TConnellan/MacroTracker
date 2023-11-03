const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const config = require('./utilities/config')
const logger = require('./utilities/logger')
const middleware = require('./utilities/middleware')
const consumedRouter = require("./controllers/consumed")
const userRouter = require("./controllers/users")

morgan.token('postData', function (req, res) {return JSON.stringify(req.body)})

const app = express()
app.use(cors()) // enable...
app.use(express.json())
app.use(express.static('build'))

//maybe eliminate one of the following
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(middleware.requestLogger)

app.use('/api/consumed', consumedRouter)
app.use('/api/userRouter', userRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app