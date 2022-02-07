const {
  Users,
  Sequelize: { Op },
} = require("../models");
const bcrypt = require("bcryptjs");

const { GenerateToken } = require("../helpers/generateToken");

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email/password not valid" });
      }
      const result = await Users.findOne({
        where: { email },
      });
      if (result) {
        const valid = bcrypt.compareSync(password, result.password);
        if (valid == true) {
          let payload = { id: result.id, email: result.email };
          let access_token = GenerateToken(payload);
          if (!access_token) {
            res.status(400).json({ message: "Invalid access_token" });
          }
          res.status(200).json({
            message: "Success login",
            access_token,
            role: result.role,
          });
        } else {
          res.status(400).json({ message: "Email/password not valid" });
        }
      } else {
        res.status(400).json({ message: "Email/password not valid" });
      }
    } catch (err) {
      res.status(500).json({ message: "Invalid server error" });
    }
  }

  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const check = await Users.findOne({ where: { email } });
      if (check) {
        res.status(400).json({ message: "Email already used" });
      }
      const user = await Users.create({
        email,
        password,
        role: "members",
      });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Invalid server error" });
    }
  }

  static async listUser(req, res) {
    try {
      const users = await Users.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Invalid server error" });
    }
  }

  static async listbyId(req, res) {
    try {
      const { id } = req.params;
      const users = await Users.findByPk(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Invalid server error" });
    }
  }
}

module.exports = UserController;
