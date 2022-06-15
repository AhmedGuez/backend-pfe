const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Fournisseur = require("../models/fournisseur");

module.exports = {
  // craete user
  createuser: async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
      const user = await User.findOne({ email });
      if (user) throw Error("User already exists");

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password");
      let newUser = new User({
        name,
        email,
        password: hash,
        role: role,
      });
      if (req.body.service) {
        newUser = new User({
          name,
          email,
          password: hash,
          service: req.body.service,
          role: req.body.role,
        });
      }

      const savedUser = await newUser.save();

      if (!savedUser) throw Error("Something went wrong saving the user");

      /* const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: 3600,
      }); */

      res.status(200).json({
        message: "user successfuly registred",
        user: savedUser,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  createFournisseur: async (req, res) => {
    const { name, email, tel } = req.body;

    if (!name || !email || !tel) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
      let newFour = new Fournisseur({
        name,
        email,
        tel,
      });

      const savedUser = await newFour.save();

      if (!savedUser) throw Error("Something went wrong saving the fournisseur");

      /* const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: 3600,
      }); */

      res.status(200).json({
        message: "user successfuly registred",
        user: savedUser,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getuserbyid: (req, res) => {
    User.findById({ _id: req.user.id }, (err, user) => {
      if (!user) {
        res.status(500).json({
          message: "user not found ",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "user found ",
          data: user,
        });
      }
    });
  },

  updateuser: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      },
      (err, user) => {
        if (!user) {
          res.status(500).json({
            message: "user not updated ",
            data: null,
          });
        } else {
          res.status(200).json({
            message: "user updated successfuly ",
            data: user,
          });
        }
      }
    );
  },

  deleteFournisseur: (req, res) => {
    Fournisseur.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Fournisseur not deleted ",
          data: null,
          status: 500,
        });
      } else {
        res.status(200).json({
          message: "Fournisseur deletd successfuly ",
          data: null,
          status: 200,
        });
      }
    });
  },

  deleteuser: (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({
          message: "user not deleted ",
          data: null,
          status: 500,
        });
      } else {
        res.status(200).json({
          message: "user deletd successfuly ",
          data: null,
          status: 200,
        });
      }
    });
  },

  getallusers: (req, res) => {
    User.find({}, (err, users) => {
      if (users.length <= 0) {
        res.status(500).json({
          message: "no users in system ",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "users in system ",
          data: users,
        });
      }
    });
  },

  getAllFournisseur: (req, res) => {
    Fournisseur.find({}, (err, fournisseurs) => {
      if (fournisseurs.length <= 0) {
        res.status(500).json({
          message: "no fournisseurs in system ",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "fournisseurs in system ",
          data: fournisseurs,
        });
      }
    });
  },

  authenticate: (req, res) => {
    const { email, password } = req.body;
    // Simple validation
    if (!email || !password) {
      return res.status(500).json({ message: "Please enter all fields" });
    } else {
      User.findOne({ email: email }, async (err, user) => {
        if (!user) {
          res.status(500).json({
            message: "user with this email does not exist",
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            res.status(500).json({
              message: "invalid password",
            });
          } else {
            const token = jwt.sign({ id: user._id }, "jwt-secret");
            res.status(200).json({
              token: token,
              role: user.role,
            });
          }
        }
      });
    }
  },

  uploadavatar: (req, res) => {
    const data = {
      avatar: req.file.filename,
    };

    User.findByIdAndUpdate({ _id: req.user.id }, data, (err, user) => {
      if (err) {
        res.status(500).json({ message: "avatar not uploaded" });
      } else {
        User.findById({ _id: user._id }, (nerr, nuser) => {
          if (nerr) {
            res.json("error");
          } else {
            res.status(200).json({
              message: "user updated",
              data: nuser,
            });
          }
        });
      }
    });
  },
};
