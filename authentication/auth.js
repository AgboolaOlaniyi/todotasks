const jwt = require("jsonwebtoken");
require("dotenv").config()

 const userEnsureLogin = async (req, res, next) => {

    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.redirect("/login")

        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        res.locals.user = decoded
    
        next()

    } catch (err) {
        console.log(err.message)
        return res.send(err.message)

 
    }
}

module.exports = {
     userEnsureLogin
}