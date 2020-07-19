// Defining methods for the userController
module.exports = {
  findAll: function (req, res, model) {
    model
      .find(req.query)
      .sort({ date: -1 })
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
        { _id: req.params.id },
        {
          $push: {
            currentWeight: req.body.currentWeight,
            day: new Date().toISOString(),
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
};
