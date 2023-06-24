const user_controller = require("../controllers/user_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const router = require("express")();

router.post("/register",user_controller.register);
router.post("/login",user_controller.login)
router.post("/forgot-password",user_controller.forgotPassword)
router.use(jwtMiddleware)
router.get("/:slug",user_controller.detail)
router.put("/edit/:slug",user_controller.edit)

module.exports = { user_router: router };
