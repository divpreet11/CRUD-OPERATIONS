const jwt = require('jsonwebtoken');
const data = require('../Model/model')
require('../index')
const cookieParser = require('cookie-parser')


const auth = async(req, res, next) => {
    try {

        const token = req.cookie.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyUser);

        const user = await data.findOne({ _id: verifyUser._id });
        console.log(user);

        next();
    } catch (error) {
        console.log(error)
            // res.status(401).send(error)
    }
}


module.exports = auth;