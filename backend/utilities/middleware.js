const logger = require('./logger')
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
  logger.logInfo('Method:', request.method)
  logger.logInfo('Path:  ', request.path)
  // logger.logInfo('Body:  ', request.body)
  logger.logInfo('---')
  next()
}

const authenticateJWT = (req, res, next) => {

  const token = req.cookies.jwt_token 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Add the decoded user information to the request object
    req.authorised = decoded;
    next();
  });

}

const unknownEndpoint = (request, response) => {
    logger.logInfo("unknown endpoint")
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    logger.logError(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    authenticateJWT
}