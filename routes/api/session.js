const router = require("express").Router();
const controller = require("../../controller/index.js");
const db = require("../../models");

// All routes prefixed with "/api/session"
router
  .route("/")
  .get((req, res) => controller.findAllSessions(req, res, db.Session))
  .post((req, res) => controller.create(req, res, db.Session));

  

  router
  .route("/timeblock/:_id")
  .patch((req, res) => controller.createNewSession(req, res, db.Session))
  



  module.exports = router;