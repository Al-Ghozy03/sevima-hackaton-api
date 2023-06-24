const Helpers = require("../helpers/helpers");
const coursemodel = require("../../models").course;
const materimodel = require("../../models").materi;
const studentmodel = require("../../models").student;
const ratingmodel = require("../../models").rating;
const savecoursemodel = require("../../models").saved_course;
const jwt = require("jsonwebtoken");

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
        include: [
          {
            model: materimodel,
            as: "materi",
            attributes: ["slug", "title", "content"],
          },
          {
            model: ratingmodel,
            attributes: ["rate"],
          },
        ],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: ["slug", "name", "keyword", "description", "thumbnail"],
      });
      const data = [];
      for (let i = 0; i < rows.length; i++) {
        let rating = 0;
        const v = rows[i].dataValues;
        if (rows[i].dataValues.ratings.length !== 0)
          for (let j = 0; j < rows[i].dataValues.ratings.length; j++) {
            rating =
              rows[i].dataValues.ratings?.reduce((n, s) => n + s.rate, 0) /
              rows[i].dataValues.ratings.length;
          }
        data.push({
          slug: v.slug,
          name: v.name,
          keyword: v.keyword,
          rating,
          description: v.description,
          thumbnail: v.thumbnail,
          materi: v.materi,
        });
      }
      return super.responseWithPagination(
        res,
        200,
        "success",
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(page),
        data
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
        include: [
          {
            model: materimodel,
            as: "materi",
            attributes: ["slug", "title", "content"],
          },
        ],
      });
      if (!data) return super.response(res, 404, "data not found");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async join(req, res) {
    try {
      const body = req.body;
      const id_user = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      await studentmodel.create({ ...body, id_user });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async save(req, res) {
    try {
      const body = req.body;
      const id_user = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      await savecoursemodel.create({ ...body, id_user });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async listSaved(req, res) {
    try {
      const { page, limit } = req.query;
      const id_user = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await savecoursemodel.findAndCountAll({
        where: { id_user },
        include: [
          {
            model: coursemodel,
          },
        ],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: [],
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
  async deleteSaved(req, res) {
    try {
      const { id } = req.params;
      const id_user = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      const data = await savecoursemodel.findOne({
        where: { id_course: id, id_user },
      });
      if (!data) return super.response(res, 404, "data not found");
      await savecoursemodel.destroy({ where: { id_course: id, id_user } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async rate(req, res) {
    try {
      const body = req.body;
      const id_user = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      await ratingmodel.create({
        id_user,
        id_course: body.id_course,
        rate: body.rate,
      });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new Course();
