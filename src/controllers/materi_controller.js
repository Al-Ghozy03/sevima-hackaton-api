const Helpers = require("../helpers/helpers");
const materimodel = require("../../models").materi;
const coursemodel = require("../../models").course;

class Materi extends Helpers {
  async create(req, res) {
    try {
      const body = req.body;
      const check = await coursemodel.findByPk(body.id_course);
      if (!check) return super.response(res, 404, "course not found");
      await materimodel.create({
        ...body,
        slug: super.convertToSlug(body.title),
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
      const data = await materimodel.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data not found");
      const body = req.body;
      if (body.title) {
        body.slug = super.convertToSlug(body.title);
      }
      await materimodel.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
  async delete(req, res) {
    try {
      const { slug } = req.params;
      const data = await materimodel.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data not found");
      await materimodel.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500);
    }
  }
}

module.exports = new Materi();
