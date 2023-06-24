const user_controller = require("../controllers/user_controller");

const router = require("express")();

router.post("/register",user_controller.register);
router.post("/login",user_controller.login)

module.exports = { user_router: router };
