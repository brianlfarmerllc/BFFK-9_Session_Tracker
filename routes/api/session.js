const router = require("express").Router();
const controller = require("../../controller/index.js");
const db = require("../../models");

// All routes prefixed with "/api/session"
router
  .route("/")
  .get((req, res) => controller.findAllSessions(req, res, db.Session))
  .post((req, res) => controller.create(req, res, db.Session));

  router
  .route("/:_id")
  .get((req, res) => controller.findAllSessionsByPetId(req, res, db.Session))

router
  .route("/timeblock/:_id")
  .patch((req, res) => controller.findOneAddTraining(req, res, db.Session))

router
  .route("/updateblock/:session/:block")
  .patch((req, res) => controller.findOneUpdateDetails(req, res, db.Session))

router
  .route("/deleteblock/:session/:block")
  .delete((req, res) => controller.removeTimeBlock(req, res, db.Session))

router
  .route("/daysnotes/:_id")
  .patch((req, res) => controller.findOneUpdate(req, res, db.Session))


module.exports = router;