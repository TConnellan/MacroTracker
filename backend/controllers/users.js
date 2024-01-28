const userRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const AUTHORISATION_FAILED = "Username or password was incorrect."
const USERNAME_EXISTS = "Username already exists"

const respondAuthorisationFailed = (response) => {
    logger.logInfo("Authorisation Failed")
    response.status(401)
    response.send(AUTHORISATION_FAILED) 
}

// be careful logging what the error is here
const respondServerError = (err, response) => {
    logger.logError(`error connecting to db: ${err}`)
    response.status(500)
    response.send("Internal Server Error")
}

userRouter.post("/loginuser", (request, response) => {
    const data = request.body
    const username = data.username
    const password = data.password
    const query = 
`
SELECT id, username, password_hash, salt 
FROM user_profile
WHERE username = $1;`

    pool.connect()
        .then(client => {
             client.query(query, [username])
                    .then(resp => {
                        if (resp.rows.length == 1) { // >1 impossible due to uniqueness on username
                            // check hash
                            queryData = resp.rows[0] 
                            logger.logInfo("Retrieved account info")
                            // hash = Buffer.from(queryData["password_hash"], 'binary').toString()
                            hash = queryData["password_hash"]
                            console.log(hash)
                            console.log(password)
                            salt = queryData["salt"]
                            id = queryData["id"]
                        
                            bcrypt.compare(password, hash)
                                .then(result => {
                                    console.log(result)
                                    if (result) {
                                        logger.logInfo("Hashes Match")
                                        response.status(200)
                                        // send id for now now before something better is implemented
                                        // const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
                                        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
                                        // response.send({id: queryData["id"], username: queryData["username"]})
                                        response.json({ token, id, username })
                                    } else {
                                        console.log("hashes not equal");
                                        respondAuthorisationFailed(response) 
                                    }                                    
                                })

                        } else {
                            respondAuthorisationFailed(response)
                        }
                    })
        .catch(err => {
            respondServerError(err, response)
        })
    })
})

userRouter.post("/newuser", (request, response) => {
    const data = request.body
    const username = data.username
    const password = data.password
    const existenceQuery = 
`
SELECT id, username, password_hash, salt
FROM user_profile
WHERE username = $1;
`

    const insertQuery = 
`
INSERT INTO user_profile(username, password_hash, salt) 
VALUES ($1, $2, $3);
`

    // I don't like the nested promise chain
    // want to see if i can refactor by just returning the query straight up and continuing the chain like that
    pool.connect()
        .then(client => {
              client.query(existenceQuery, [username])
                    .then(resp => {
                        if (resp.rows.length == 0) {
                            // create user
                            //generate salt
                            const newSalt = crypto.randomBytes(16).toString('hex')
                            // bcrypt.hash(password + newSalt, 10)
                            bcrypt.hash(password, 10)
                                .then( hash => {
                                    // const hexSaltedHash = Buffer.from(hash, 'binary').toString('hex')

                                    client.query(insertQuery, [username, hash, newSalt])
                                        .then(resp => {
                                            response.status(201)
                                            response.send(resp)
                                        })
                                })
                        } else {
                                response.status(409) // unauthorized
                                response.send(USERNAME_EXISTS)
                        }
                    })
                    .finally(() => {
                        client.release()
                    })
        })
        .catch(err => {
            respondServerError(err, response)
        })
})



module.exports = userRouter