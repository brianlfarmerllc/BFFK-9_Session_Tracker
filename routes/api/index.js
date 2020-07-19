const router = require("express").Router();
const userRoutes = require("./client");


// routes
router.use("/client", userRoutes);
router.use("/pet", userRoutes);

module.exports = router;
