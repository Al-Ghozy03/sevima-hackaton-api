const Helpers = require("../helpers/helpers");
const coursemodel = require("../../models").course;

class Course extends Helpers {
  async create(req, res) {
    try {
      const body = req.body;
      const { secure_url } = await super.upload(req.file.path, "course");
      await coursemodel.create({
        ...body,
        thumbnail: secure_url,
        slug: super.convertToSlug(body.name),
      });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async edit(req, res) {
    try {
      const { slug } = req.params;
      const data = await coursemodel.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data not found");
      const body = req.body;
      if (req.file === undefined) {
        body.thumbnail = data.thumbnail;
      } else {
        const { secure_url } = await super.upload(req.file.path, "course");
        body.thumbnail = secure_url;
      }
      if (body.name) {
        body.slug = super.convertToSlug(body.name);
      }
      await coursemodel.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async delete(req, res) {
    try {
      const { slug } = req.params;
      const data = await coursemodel.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data not found");
      await coursemodel.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async list(req, res) {
    try {
      const { page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await coursemodel.findAndCountAll({
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: ["slug", "name", "keyword", "description", "thumbnail"],
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
      return super.responseWithPagination(res, 500);
    }
  }
  async detail(req, res) {
    try {
      const { slug } = req.params;
      const data = await coursemodel.findOne({
        where: { slug },
        attributes: ["slug", "name", "keyword", "description", "thumbnail"],
      });
      if (!data) return super.response(res, 404, "data not found");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new Course();
