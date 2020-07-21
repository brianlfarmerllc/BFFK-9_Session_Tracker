const router = require("express").Router();
const controller = require("../../controller/index.js");
const db = require("../../models");

// All routes prefixed with "/api/pet"
router
  .route("/")
  .get((req, res) => controller.findAll(req, res, db.Pet))
  .post((req, res) => controller.create(req, res, db.Pet));


  module.exports = router;