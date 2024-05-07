const consumedRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")
const standardResponses = require("../utilities/standardResponses")

consumedRouter.get("/:startdate&:enddate", (request, response) => {
    console.log(request.params);
    const userID = request.authorised.id
    logger.logInfo(`id was${userID}`);
    const startDate = request.params.startdate
    const endDate = request.params.enddate
    logger.logInfo(`startdate was: ${startDate}`);
    logger.logInfo(`enddate was: ${endDate}`);
    const query = 
`
SELECT id, recipe_id, quantity, carbs, fats, proteins, consumed_at, created_at, last_edited_at, notes
FROM consumed
WHERE user_id = $1
  AND consumed_at >= $2
  AND consumed_at <= $3
;
`

    pool.connect() 
        .then((client) => {
            logger.logInfo("Made Connection")
            return client.query(query, [userID, startDate, endDate])
                        .then(resp => {
                            response.json(resp.rows)
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

consumedRouter.post("/addconsumed", (request, response) => {
    const data = request.body
    logger.logInfo(request.body);

    const id = request.authorised.id

    const values = [id, data.recipe_id,data.quantity,data.carbs,data.fats,data.proteins,data.consumed_at,data.created_at,data.last_edited_at,data.notes]
    const query=
`
INSERT INTO consumed(user_id, recipe_id, quantity, carbs, fats, proteins, consumed_at, created_at, last_edited_at, notes) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
RETURNING *;
`
    pool.connect()
        .then(client => {
            logger.logInfo("Made Connection")
            client.query(query, values)
                .then(resp => {
                    response.status(201)
                    response.send(resp)
                    logger.logInfo("Query Successful")
                })
                .catch(err => logger.logError(`Error in query: ${err}`))
                .finally(() => {
                    client.release()
                    logger.logInfo("Client Released")
                })
        })
        .catch(error => {
            logger.logError(`error connecting to db: ${error}`)
            response.status(500)
            response.send()
        })
})

consumedRouter.delete("/:cons_id", (request, response) => {
    const id = request.params.cons_id

    check_query=
`
SELECT user_id
FROM consumed
WHERE id=$1;
`
    delete_query=
`
DELETE
FROM consumed
WHERE id=$1
`

    pool.connect()
        .then(client => {
            client.query(check_query, [id])
                .then(resp => {
                    if (resp.rows.length==0) {
                        // respond doesn't exist

                        return
                    } else if (resp.rows.length>1) {
                        console.log(resp);
                        logger.logError("Uniqueness Constraint violated")
                        // respond server error
                        return
                    } else if (resp.rows[0]["user_id"] != request.authorised.id) {
                        //not authorised
                        standardResponses.respondUnauthorisedAccess(response)
                        return
                    } else {
                        client.query(delete_query, [id])
                            .then(resp => {
                                response.status(200)
                                response.send(resp)
                            })
                    }

                })
                .catch(err => {
                    logger.logError(err)
                    response
                })
                .finally(() => {
                    client.release()
                    logger.logInfo("Client Released")
                })
        })
})

module.exports = consumedRouter