const categorymodel = require("../../models").category;
const Helpers = require("../helpers/helpers");
require("dotenv").config();

class Category extends Helpers {
  async list(req, res) {
    try {
      const { page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await categorymodel.findAndCountAll({
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: ["id", "name"],
      });
      return super.responseWithPagination(
        res,
        200,
        "success",
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(page),
        rows
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await categorymodel.findOne({
        where: { id },
        attributes: ["id", "name"],
      });
      if (!data) return super.response(res, 404, "data not found");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new Category();
