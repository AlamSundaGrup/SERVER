const { verifyToken } = require("../helpers/jwt");

function authentication(req, res, next) {
  try {
    console.log("---");

    if (!req.headers.authorization) throw { name: "Unauthorized" };
    const [bearer, token] = req.headers.authorization?.split(" ");
    console.log("<<<<<<<");

    const verify = verifyToken(token);
    if (!verify) throw { name: "Unauthorized" };

    req.user = {
      id: verify.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
