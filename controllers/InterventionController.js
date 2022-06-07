const { useColors } = require("debug/src/browser");
const { MongoClient, ObjectID } = require("mongodb");
const Intervention = require("../models/intervention");
const User = require("../models/User");

module.exports = {
  addIntervention: (req, res) => {
    const { name, delai, description, lieu, degree, createdBy } = req.body;

    if (!name || !delai || !description || !lieu || !degree || !createdBy) {
      res.status(400).json({
        message: "all fields is required!",
      });
    }

    try {
      const newIntervention = new Intervention({
        name: name,

        delai: delai,
        description: description,
        lieu: lieu,
        degree: degree,
        createdBy: createdBy,
      });
      newIntervention.save().then(() => {
        res.status(200).json({
          message: "Intervention added!",
        });
      }); // yestanna serivce lin yetsajel
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  },

  allInterventions: async (req, res) => {
    const response = await Intervention.find();
    let interventions = [];
    if (response) {
      for (let i = 0; i < response.length; i++) {
        if (response[i].createdBy) {
          let user = await User.findById({ _id: response[i].createdBy });

          let intervention = {
            name: response[i].name,
            _id: response[i]._id,
            createdBy: user,
            degree: response[i].degree,
            etat: response[i].etat,
            delai: response[i].delai,
            description: response[i].description,
            lieu: response[i].lieu,
          };
          interventions.push(intervention);
        }
      }
    }
    console.log(interventions);
    res.json(interventions);
  },

  getInterventionById: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        status: 400,
        message: "Intervention ID is required in params!",
      });
    }
    try {
      const inter = await Intervention.findById({ _id: req.params.id });

      let createdby = await User.findById({ _id: inter.createdBy });

      console.log("inter", inter.affectedToUsers[0]);
      if (inter.affectedToUsers && inter.affectedToUsers.length > 0) {
        let result = await Promise.all(
          inter.affectedToUsers.map(async (id) => {
            let user = await User.findById({ _id: id.toString() });
            return user;
          })
        );

        res.status(200).json({
          name: inter.name,
          _id: inter._id,
          createdBy: createdby,
          degree: inter.degree,
          etat: inter.etat,
          delai: inter.delai,
          description: inter.description,
          lieu: inter.lieu,
          affectedToUsers: result,
        });
      }

      res.status(200).json({
        name: inter.name,
        _id: inter._id,
        createdBy: createdby,
        degree: inter.degree,
        etat: inter.etat,
        delai: inter.delai,
        description: inter.description,
        lieu: inter.lieu,
        affectedToUsers: null,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  },

  updateIntervention: async (req, res) => {
    const { affectedBy } = req.body;
    if (req.params.id && !req.body.fermer) {
      try {
        const inter = await Intervention.findById({ _id: req.params.id });
        await Intervention.findByIdAndUpdate(
          { _id: req.params.id },
          {
            affectedBy: affectedBy,
            affectedToUsers: inter.affectedToUsers && inter.affectedToUsers.length > 0 ? [...inter.affectedToUsers, affectedBy] : [affectedBy],
            dateDebut: Date.now(),
            etat: "EN_COURS",
          }
        );
        res.status(200).json({
          message: "Intervention affected to tech successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "error from server",
        });
      }
    } else if (req.body.fermer) {
      try {
        await Intervention.findByIdAndUpdate(
          { _id: req.params.id },
          {
            dateDebut: null,
            etat: "NON_AFFECTEE",
            affectedBy: null,
          }
        );
        res.status(200).json({
          message: "Intervention updated successfully",
        });
      } catch (err) {
        res.status(500).json({
          message: "error from server",
        });
      }
    }
  },
};
