const category_controller = require("../controllers/category_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const router = require("express")();

// router.use(jwtMiddleware)
router.get("/",category_controller.list)
router.get("/:id",category_controller.detail)

module.exports = { category_router: router };
