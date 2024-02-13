const consumableRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")


consumableRouter.get("/search/:searchtext", (request, response) => {
    const searchText = request.params.searchtext
    logger.logInfo(`Performing search for: ${searchText}`)

    const query = 
`
SELECT * 
FROM consumable
WHERE cons_name ILIKE '%' || $1 || '%'
    OR brand_name ILIKE '%' || $1 || '%'
LIMIT 10
`

    pool.connect()
        .then((client) => {
            return client.query(query, [searchText])
                .then(resp => {
                    response.json(resp.rows)
                    logger.logInfo(`Search for ${searchText} was successful`)
                })
                .catch(err => {
                    response.status(500)
                    response.json({ error: 'Internal Server Error' })
                    logger.logError(`Error in query: ${err}`)
                })
                .finally(() => {
                    client.release()
                })
        })
        .catch(err => {
            logger.logError(`Error making connection to DB ${err}`)
        })
}) 



module.exports = consumableRouter