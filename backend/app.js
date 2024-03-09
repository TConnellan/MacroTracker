const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const config = require('./utilities/config')
const logger = require('./utilities/logger')
const middleware = require('./utilities/middleware')
const consumedRouter = require("./controllers/consumed")
const consumableRouter = require("./controllers/consumables")
const userRouter = require("./controllers/users")
const recipeRouter = require("./controllers/recipes")
const cookieParser = require("cookie-parser");


morgan.token('postData', function (req, res) {return ""})

const app = express()
app.use(cors()) // enable...
app.use(express.json())
app.use(express.static('build'))
app.use(cookieParser())

//maybe eliminate one of the following
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(middleware.requestLogger)

app.use('/api/consumed', middleware.authenticateJWT)
app.use('/api/consumed', consumedRouter)

// app.use('/api/consumable/search', middleware.authenticateJWT)
app.use('/api/consumable/', consumableRouter)

app.use('/api/recipe/', middleware.authenticateJWT)
app.use('/api/recipe/', recipeRouter)

app.use('/api/user/verify', middleware.authenticateJWT)
app.use('/api/user', userRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app