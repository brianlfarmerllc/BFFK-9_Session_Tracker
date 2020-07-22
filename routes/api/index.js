const router = require("express").Router();
const clientRoutes = require("./client");
const petRoutes = require("./pet");
const sessionRoutes = require("./session");


// routes
router.use("/client", clientRoutes);
router.use("/pet", petRoutes);
router.use("/session", sessionRoutes);

module.exports = router;
