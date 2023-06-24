const { category_router } = require("./category_router");
const { course_router } = require("./course_router");
const { interest_router } = require("./interest_router");
const { user_router } = require("./user_router");
const router = require("express")();

router.get("/", (req, res) => res.json({ message: "welcome", data: null }));
router.use("/user", user_router);
router.use("/category", category_router);
router.use("/interest", interest_router);
router.use("/course", course_router);


router.all("*", (req, res) =>
  res.status(404).json({ message: "route not found", data: null })
);

module.exports = router;
