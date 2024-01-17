const consumedRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")


const UNAUTHORISED_ACCESS = "Unauthorised to access this data"

const respondUnauthorisedAccess = (response) => {
    logger.logInfo("Unauthorised access attempt")
    response.status(403)
    response.send(UNAUTHORISED_ACCESS)
}


consumedRouter.get("/:userid&:date", (request, response) => {

    // check user is authenticated to access this
    if (request.authorised.id != request.params.userid) {
        console.log(request)
        respondUnauthorisedAccess(response)
        return
    }


    const userID = Number(request.params.userid)
    logger.logInfo(`id was${userID}`);
    const date = request.params.date
    logger.logInfo(`date was: ${date}`);
    const query = 
`
SELECT carbs, fats, proteins 
FROM consumed
WHERE user_id = $1 AND consumed_at >= CURRENT_DATE;
`
// `
// SELECT carbs, fats, proteins 
// FROM consumed INNER JOIN user_profile ON user_profile.id=consumed.user_id
// WHERE user_profile.id = $1; 
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
                        .finally(client => {
                            // client.release()
                            logger.logInfo("Client not Released")
                        })
        })
        .catch(err => {
            logger.logError(`error connecting to db: ${err}`)
        })
        

        
        
})


consumedRouter.post("/addconsumable", (request, response) => {
    const data = request.body
    logger.logInfo(request);
    const values = [data.name,data.brand_name,data.size,data.units,data.carbs,data.fats,data.proteins]
    const query=
`
INSERT into consumable(cons_name, brand_name, size, units, carbs, fats, proteins) values ($1,$2,$3,$4,$5,$6,$7);
`
    pool.connect()
        .then(client => {
            logger.logInfo("Made Connection")
            return client.query(query, values)
                        .then(resp => {
                            response.status(201)
                            // response.send(resp)
                            response.json(resp)
                            logger.logInfo("Query Successful")
                        })
                        .catch(err => logger.logError(`Error in query: ${err}`))
                        .finally((client) => {
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
    const values = [data.user_id,data.recipe_id,data.quantity,data.carbs,data.fats,data.proteins,data.consumed_at,data.created_at,data.last_edited_at,data.notes]
    const query=
`
INSERT into consumed(user_id, recipe_id, quantity, carbs, fats, proteins, consumed_at, created_at, last_edited_at, notes) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
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
                    // client.release()
                    logger.logInfo("Client Not Released")
                })
        })
        .catch(error => {
            logger.logError(`error connecting to db: ${err}`)
            response.status(500)
            response.send()
        })
})

module.exports = consumedRouter