const materi_controller = require("../controllers/materi_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const router = require("express")();

router.use(jwtMiddleware);
router.post("/create", materi_controller.create);
router.put("/edit/:slug", materi_controller.edit);
router.delete("/delete/:slug", materi_controller.delete);

module.exports = { materi_router: router };
