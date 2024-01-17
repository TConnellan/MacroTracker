const logger = require('./logger')
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
  logger.logInfo('Method:', request.method)
  logger.logInfo('Path:  ', request.path)
  logger.logInfo('Body:  ', request.body)
  logger.logInfo('---')
  next()
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // header of form Authorization: Bearer <token>
  if (!token) {
    console.log("HERE");
    return res.status(401).json({ message: 'No token provided' })
  }
  // console.log(process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // process.env.SECRET_KEY
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Add the decoded user information to the request object
    req.authorised = decoded;
    next();
  });

}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    logger.logError(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
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