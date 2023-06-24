const interestmodel = require("../../models").interest;
const categorymodel = require("../../models").category;
const Helpers = require("../helpers/helpers");
const jwt = require("jsonwebtoken")
require("dotenv").config();

class Interest extends Helpers {
  async bulkCreate(req, res) {
    try {
      const id_user = req.headers.authorization.split(" ")[1];
      const { data } = req.body;
      for (let i = 0; i < data.length; i++) {
        const check = await categorymodel.findByPk(data[i].id_category);
        if (!check)
          return super.response(
            res,
            404,
            `category not found at index ${i}`
          );
          data[i].id_user = jwt.decode(id_user).id
      }
      await interestmodel.bulkCreate(data);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new Interest();
