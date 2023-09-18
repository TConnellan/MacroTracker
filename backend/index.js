require('dotenv').config()
const {Pool, Client} = require("pg")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
morgan.token('postData', function (req, res) {return JSON.stringify(req.body)})

const app = express()
app.use(cors()) // enable...
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

const pool = new Pool()
pool
    .connect() // will be based on parameters in environment
    .then(() => {
        console.log("Made Connection");
    })
    .catch(err => {
        console.log(`error connecting to db`)
    })


// get
app.get("/api/consumed/:userid&:date", (request, response) => {
    const userID = Number(request.params.userid)
    console.log(`id was${userID}`);
    const date = request.params.date
    console.log(`date was: ${date}`);
    const query = 
`
SELECT carbs, fats, proteins 
FROM consumed
WHERE user_id = 1 AND consumed_at IS NULL;
`
    pool.query(query) //"SELECT * FROM user_profile"
        .then(resp => response.json(resp.rows))
})


app.post("/api/consumed/addconsumable", (request, response) => {
    const data = request.body
    console.log(request);
    const values = [data.name,data.brand_name,data.size,data.units,data.carbs,data.fats,data.proteins]
    const query=
`
INSERT into consumable(cons_name, brand_name, size, units, carbs, fats, proteins) values ($1,$2,$3,$4,$5,$6,$7);
`
    pool.query(query, values)
        .then(resp => {
            response.status(201)
            response.send(resp)
        })
})

app.post("/api/consumed/addconsumed", (request, response) => {
    const data = request.body
    console.log(request.body);
    const values = [data.user_id,data.recipe_id,data.quantity,data.carbs,data.fats,data.proteins,data.consumed_at,data.created_at,data.last_edited_at,data.notes]
    const query=
`
INSERT into consumed(user_id, recipe_id, quantity, carbs, fats, proteins, consumed_at, created_at, last_edited_at, notes) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
`
    pool.query(query, values)
        .then(resp => {
            response.status(201)
            response.send(resp)
        })
        .catch(error => {
            console.error(error)
            response.status(500)
            response.send()
        })
})


// app.get("/api/users/:username", (request, response) => {
//     //response.json(persons)
    
//     const query = 
// `
//     SELECT 
//     table_name, 
//     column_name, 
//     data_type 
//  FROM 
//     information_schema.columns
//  WHERE 
//     table_name = 'user_profile'
// `
//     pool
//         //.query(query) //"SELECT * FROM user_profile"
//         .query(query) //"SELECT * FROM user_profile"
//         .then(resp => response.json(resp.rows))
// })



const PORT = process.env.PORT
// for dev
if (PORT === "3001") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
} else {
    console.log(`Server running on port ${PORT}`)
}