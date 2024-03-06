const logger = require("./logger")

const UNAUTHORISED_ACCESS = "Unauthorised to access this data"

const respondUnauthorisedAccess = (response) => {
    logger.logInfo("Unauthorised access attempt")
    response.status(403)
    response.send(UNAUTHORISED_ACCESS)
}


module.exports = {respondUnauthorisedAccess}