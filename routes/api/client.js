const router = require("express").Router();
const controller = require("../../controller/index.js");
const db = require("../../models");

// All routes prefixed with "/api/client"
router
  .route("/")
  .get((req, res) => controller.findAll(req, res, db.Client))
  .post((req, res) => controller.create(req, res, db.Client));
  


module.exports = router;
