const { verifyToken } = require("../helpers/jwt")

function authentication(req, res, next) {
    try {
        if(!req.headers.authorization) throw {name : "Unauthorized"}
        const [bearer, token] = req.headers.authorization?.split(" ")

        const verify = verifyToken(token)
        if(!verify) throw {name : "Unauthorized"}

        req.user = {
            id : verify.id
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = authentication