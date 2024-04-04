const consumedRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")
const standardResponses = require("../utilities/standardResponses")

consumedRouter.get("/:date", (request, response) => {

    const userID = request.authorised.id
    logger.logInfo(`id was${userID}`);
    const date = request.params.date
    logger.logInfo(`date was: ${date}`);
    const query = 
`
SELECT id, recipe_id, quantity, carbs, fats, proteins, consumed_at, created_at, last_edited_at, notes
FROM consumed
WHERE user_id = $1;
`
// `
// SELECT id, carbs, fats, proteins 
// FROM consumed
// WHERE user_id = $1 AND consumed_at >= CURRENT_DATE;
// ` 
   
    pool.connect() // will be based on parameters in environment
        .then((client) => {
            logger.logInfo("Made Connection")
            return client.query(query, [userID])
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


// consumedRouter.post("/addconsumable", (request, response) => {
//     const data = request.body
//     logger.logInfo(request);
//     const values = [data.name,data.brand_name,data.size,data.units,data.carbs,data.fats,data.proteins]
//     const query=
// `
// INSERT into consumable(cons_name, brand_name, size, units, carbs, fats, proteins) values ($1,$2,$3,$4,$5,$6,$7);
// `
//     pool.connect()
//         .then(client => {
//             logger.logInfo("Made Connection")
//             return client.query(query, values)
//                         .then(resp => {
//                             response.status(201)
//                             // response.send(resp)
//                             response.json(resp)
//                             logger.logInfo("Query Successful")
//                         })
//                         .catch(err => logger.logError(`Error in query: ${err}`))
//                         .finally(() => {
//                             client.release()
//                             logger.logInfo("Client Released")
//                         })
//         })
//         .catch(err => {
//             logger.logError(`error connecting to db: ${err}`)
//         })
// })

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