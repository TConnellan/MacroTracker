const recipeRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")
const standardResponses = require("../utilities/standardResponses")

recipeRouter.post("/addrecipe", (request, response) => {
    const data = request.body
    logger.logInfo(data)
    // const dataId = data.user
    const dataId = request.authorised.id
    const recipeName = data.recipe_name
    const recipeNotes = data.notes
    const recipeComponents = data.recipeComponents
    // logger.logInfo(request);
    
    // if (request.authorised.id != dataId) {
    //     console.log(request)
    //     standardResponses.respondUnauthorisedAccess(response)
    //     return
    // }

    const values = [recipeName,dataId,recipeNotes,JSON.stringify(recipeComponents)]
    const query = 
`
CALL create_new_recipe($1, $2, $3, $4);
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
                .catch(err => {
                    logger.logError(`Error in query: ${err}`)
                    response.status(500)
                    response.json({ error: 'Internal Server Error' })
                })
                .finally(() => {
                    client.release()
                    logger.logInfo("Client Released")
                })
        })
        .catch(err => {
            logger.logError(`error connecting to db: ${err}`)
        })
})

recipeRouter.get("/search/:searchtext", (request, response) => {
    const searchText = request.params.searchtext
    logger.logInfo(`Performing search for: ${searchText}`)

    const query = 
`
SELECT R.id, R.recipe_name, R.notes, RC.step_no, RC.step_description, C.cons_name, C.brand_name, C.carbs, C.proteins, C.fats, RC.quantity
FROM recipe R 
    INNER JOIN recipe_component RC ON R.id = RC.recipe_id 
    INNER JOIN consumable C ON RC.component_id = C.id
WHERE R.recipe_name ILIKE '%' || $1 || '%'
LIMIT 10;
`

    pool.connect()
        .then((client) => {
            return client.query(query, [searchText])
                .then(resp => {
                    const output = []
                    const used = {}
                    for (const row of resp.rows){
                        if (row.id in used) {
                            output[used[row.id]].components.push({step_no: row.step_no, step_description: row.step_description, cons_name: row.cons_name, brand_name: row.brand_name, carbs: row.carbs, proteins: row.proteins, fats: row.fats, quantity: row.quantity})
                        } else {
                            const curr = {}
                            const rowId = row.id
                            curr.id = rowId
                            curr.recipe_name = row.recipe_name
                            curr.notes = row.notes
                            curr.components = []
                            curr.components.push({step_no: row.step_no, step_description: row.step_description, cons_name: row.cons_name, brand_name: row.brand_name, carbs: row.carbs, proteins: row.proteins, fats: row.fats, quantity: row.quantity})
                            output.push(curr)
                            used[rowId] = (output.length - 1).toString()
                        }
                    }

                    response.json(output)
                    logger.logInfo(`Search for ${searchText} was successful`)
                })
                .catch(err => {
                    response.status(500)
                    response.json({ error: 'Internal Server Error' })
                    logger.logError(`Error in query: ${err}`)
                    logger.logError(err.stack)
                })
                .finally(() => {
                    client.release()
                })
        })
        .catch(err => {
            logger.logError(`Error making connection to DB ${err}`)
        })
}) 

module.exports = recipeRouter