const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    if(!req.headers.authorization) throw { name: "Unauthorized" };
    
    let [bearer, token] = req.headers.authorization?.split(" ");

    if (!token || bearer !== "Bearer") throw { name: "Unauthorized" };

    const verify = verifyToken(token, process.env.JWT_SECRET);

    req.user = {
        id : verify.id
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication
