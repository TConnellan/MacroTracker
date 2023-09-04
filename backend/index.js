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

app.get("/api/users/:username", (request, response) => {
    //response.json(persons)
    
    const query = 
`
    SELECT 
    table_name, 
    column_name, 
    data_type 
 FROM 
    information_schema.columns
 WHERE 
    table_name = 'user_profile'
`
    pool
        //.query(query) //"SELECT * FROM user_profile"
        .query(query) //"SELECT * FROM user_profile"
        .then(resp => response.json(resp.rows))
})


const PORT = process.env.PORT
// for dev
if (PORT === "3001") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
} else {
    console.log(`Server running on port ${PORT}`)
}