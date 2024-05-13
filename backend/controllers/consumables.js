const consumableRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")

consumableRouter.post("/addconsumable", (request, response) => {
    const data = request.body
    logger.logInfo(request);
    const values = [data.cons_name,data.brand_name,data.size,data.units,data.carbs,data.fats,data.proteins]
    const query=
`
INSERT into consumable(cons_name, brand_name, size, units, carbs, fats, proteins) values ($1,$2,$3,$4,$5,$6,$7)
RETURNING id;
`
    pool.connect()
        .then(client => {
            logger.logInfo("Made Connection")
            return client.query(query, values)
                        .then(resp => {
                            response.status(201)
                            response.json(resp)
                            logger.logInfo("Query Successful")
                        })
                        .catch(err => logger.logError(`Error in query: ${err}`))
                        .finally(() => {
                            client.release()
                            logger.logInfo("Client Released")
                        })
        })
        .catch(err => {
            logger.logError(`error connecting to db: ${err}`)
        })
})

consumableRouter.get("/search/:searchtext&:offset&:limit", (request, response) => {
    const searchText = request.params.searchtext
    // restrict maximum page size
    const limit = Math.min(parseInt(request.params.limit), 100) 
    const offset = parseInt(request.params.offset)
    logger.logInfo(`Performing search for: ${searchText}`)

    const query = 
`
SELECT *, count(*) OVER() as full_count
FROM consumable
WHERE cons_name ILIKE '%' || $1 || '%'
    OR brand_name ILIKE '%' || $1 || '%'
LIMIT $2
OFFSET $3
`

    pool.connect()
        .then((client) => {
            return client.query(query, [searchText, limit, offset])
                .then(resp => {
                    const fullCount = resp.rows.length > 0 ? parseInt(resp.rows[0]["full_count"]) : 0
                    const respValue = {
                        "data": resp.rows,
                        "pagination": {
                            "totalRecords": fullCount,
                            "currentPage": offset,
                            "totalPages": Math.ceil(fullCount / limit), 
                            "nextPage:": offset === Math.ceil(fullCount / limit) - 1 ? null : offset + 1 
                        }
                    }
                    respValue.data.forEach(record => {
                        delete record.full_count
                    })
                    response.json(respValue)
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