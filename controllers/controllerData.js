const {
  Expenditure,
  Sequelize: { Op },
} = require("../models");

class DataController {
  static async createExpenditure(req, res) {
    try {
      const { item, price, description, type } = req.body;
      const { id } = req.user;
      const createItem = await Expenditure.create({
        userId: id,
        item,
        price,
        type,
        description,
      });
      res.status(200).json(createItem);
    } catch (error) {
      res.status(500).json({ message: "Invalid server error" });
    }
  }
}

module.exports = DataController;
