const Server = require("./server");
const usermodel = require("../../models").user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const slug = require("slug");
require("dotenv").config();

class User extends Server {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await usermodel.findOne({ where: { email: body.email } });
      if (check) return super.responseWithToken(res, 500, "email has been used");
      body.password = bcrypt.hashSync(body.password, 10);
      body.slug = slug(body.name);
      const token = jwt.sign(
        { name: body.name, slug: body.slug },
        process.env.JWT_SIGN
      );
      await usermodel.create(body);
      return super.responseWithToken(res, 200, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500);
    }
  }
  async login(req, res) {
    try {
      const body = req.body;
      const data = await usermodel.findOne({ where: { email: body.email } });
      if (!data) return super.responseWithToken(res, 404, "email not found");
      const verify = bcrypt.compareSync(body.password, data.password);
      if (!verify)
        return super.responseWithToken(res, 403, "password is wrong");
      const token = jwt.sign(
        { name: data.name, slug: data.slug },
        process.env.JWT_SIGN
      );
      return super.responseWithToken(res, 200, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500);
    }
  }
}

module.exports = new User();
