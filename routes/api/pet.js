const router = require("express").Router();
const controller = require("../../controller/controller");
const db = require("../../models");

// All routes prefixed with "/api/pet"
router
  .route("/")
  .post((req, res) => controller.create(req, res, db.Pet));