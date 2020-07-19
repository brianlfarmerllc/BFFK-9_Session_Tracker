const router = require("express").Router();
const controller = require("../../controller/index.js");
const db = require("../../models");

// All routes prefixed with "/api/client"
router
  .route("/")
  .get((req, res) => controller.findAll(req, res, db.Client))
  .post((req, res) => controller.create(req, res, db.Client));
  // .post((req, res) => console.log(req.body));



// route for retrieving info of current signed in user and for isAuth component
// router.route("/currentuser").get((req, res) => {
//   if (!req.user) {
//     // The user is not logged in, send back an empty object
//     res.json({
//       username: "",
//       id: "",
//     });
//   } else {
//     // Otherwise send back the user's email and id
//     res.json({
//       username: req.user.username,
//       id: req.user._id,
//     });
//   }
// });

module.exports = router;
