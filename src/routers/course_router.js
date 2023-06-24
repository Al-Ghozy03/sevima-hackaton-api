const course_controller = require("../controllers/course_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const upload = require("../middlewares/upload");
const router = require("express")();

router.use(jwtMiddleware);
router.post("/create", upload.single("thumbnail"), course_controller.create);
router.put("/edit/:slug", upload.single("thumbnail"), course_controller.edit);
router.delete("/delete/:slug", course_controller.delete);
router.get("/", course_controller.list);
router.get("/:slug", course_controller.detail);

module.exports = { course_router: router };
