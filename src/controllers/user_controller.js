const usermodel = require("../../models").user;
const forgotpasswordmodel = require("../../models").forgot_password;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Helpers = require("../helpers/helpers");
require("dotenv").config();

class User extends Helpers {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await usermodel.findOne({ where: { email: body.email } });
      if (check)
        return super.responseWithToken(res, 500, "email has been used");
      body.password = bcrypt.hashSync(body.password, 10);
      body.slug = super.convertToSlug(body.name);
      const data = await usermodel.create(body);
      const token = jwt.sign(
        { id: data.id, name: body.name, slug: body.slug },
        process.env.JWT_SIGN
      );
      return super.responseWithToken(res, 200, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500);
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const data = await usermodel.findOne({ where: { email: email } });
      if (!data) return super.response(res, 404, "email not found");
      const code = Math.floor(1000 + Math.random() * 9000);
      await forgotpasswordmodel.create({
        id_user: data.id,
        token: code,
      });
      return super.response(res, 200, null);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
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
        { id: data.id, name: data.name, slug: data.slug },
        process.env.JWT_SIGN
      );
      return super.responseWithToken(res, 200, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500);
    }
  }
  async detail(req, res) {
    try {
      const { slug } = req.params;
      const data = await usermodel.findOne({
        where: { slug },
        attributes: ["name", "email", "slug"],
      });
      if (!data) return super.response(res, 404, "user not found");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async edit(req, res) {
    try {
      const { slug } = req.params;
      const body = req.body;
      const data = await usermodel.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "user not found");
      if (body.name !== undefined) body.slug = super.convertToSlug(body.name);
      await usermodel.update(body, { where: { slug } });
      return super.response(res, 200, null);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new User();
