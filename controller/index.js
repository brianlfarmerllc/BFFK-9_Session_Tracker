// Defining methods for the userController
module.exports = {
  // find and return all from document and sort by newest first
  findAll: function (req, res, model) {
    model
      .find(req.query)
      .sort({ createdAt: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // find all sessions and sort by oldest first
  findAllSessions: function (req, res, model) {
    model
      .find(req.query)
      .sort({ day: 1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res, model) {
    model
      .findOne({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOneUpdate: function (req, res, model) {
    model
      .findOneAndUpdate(
        { _id: req.params._id },
        {
          $push: {
            training_block: req.body,
          },
        },
        { new: true }
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findByUserId: function (req, res, model) {
    model
      .find({ userId: req.user._id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res, model) {
    model
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res, model) {
    model
      .findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // createNewDay: function (req, res, model) {
  //   console.log(req.params.petId)
  //   model
  //     .findOneAndUpdate(
  //       { _id: req.params.petId },
  //       {
  //         $push: {
  //           "training.day": new Date().toISOString(),
  //         },
  //       },
  //       { new: true }
  //     )
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
  // createAndReturnAll: function (req, res, model) {
  //   model
  //     .create(req.body).find(req.query)
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
};
