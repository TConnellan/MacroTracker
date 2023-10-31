
const logger = require("./utilities/logger")
const config = require("./utilities/config")
const app = require("./app")


app.listen(config.PORT, () => {
    logger.logInfo(`Server running on port ${config.PORT}`)
})