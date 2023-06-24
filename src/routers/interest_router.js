const interest_controller = require("../controllers/interest_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const router = require("express")();

router.use(jwtMiddleware)
router.post("/bulk-create",interest_controller.bulkCreate)
module.exports = { interest_router: router };
