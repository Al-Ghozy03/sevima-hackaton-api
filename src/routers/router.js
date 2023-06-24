const { user_router } = require("./user_router");
const router = require("express")();

router.get("/", (req, res) => res.json({ message: "welcome", data: null }));
router.use("/user", user_router);
router.all("*", (req, res) =>
  res.status(404).json({ message: "route not found", data: null })
);

module.exports = router;
