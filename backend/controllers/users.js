const userRouter = require("express").Router()
const { pool } = require("./dbPool")
const logger = require("../utilities/logger")
const bcrypt = require("bcrypt")
const crypto = require("crypto")



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
            return client.query(get, [username])
                        .then(resp => {
                            if (resp.rows.length == 0) {
                                // create user
                                //generate salt
                                const newSalt = crypto.randomBytes(32).toString('hex')
                                const saltedHash = bcrypt.hash(password + newSalt, 10)

                                client.query(insertQuery, [username, saltedHash, newSalt])
                            }
                        })
                        .finally(client => {
                            client.release()
                        })
        })
        .catch(err => {
            logger.logError(`error connecting to db: ${err}`)
        })
})



module.exports = userRouter