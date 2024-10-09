const { Profile } = require("../models");

async function authorization(req, res, next) {
 try {
    let { id } = req.user;
    let profile = await Profile.findOne({ where: { UserId: id } });
    if (profile) {
      return res.json({ id: profile.id });
    }else{
      next()
    }
 } catch (error) {
    next(error)
 }
 
}

module.exports = authorization;
