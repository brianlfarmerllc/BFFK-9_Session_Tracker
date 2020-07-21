const router = require("express").Router();
const clientRoutes = require("./client");
const petRoutes = require("./pet");


// routes
router.use("/client", clientRoutes);
router.use("/pet", petRoutes);

module.exports = router;
